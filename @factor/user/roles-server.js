import { addFilter } from "@factor/tools"
import { writeConfig } from "@factor/cli/setup"

addFilter("user-schema", _ => {
  _.role = {
    type: String,
    enum: Object.keys(roles()),
    required: true,
    default: "member"
  }

  _.accessLevel = {
    type: Number,
    min: 0,
    max: 1000,
    required: true,
    default: 0,
    index: true
  }

  return _
})

// Add role property to user schema
// Create a virtual accessLevel property based on role
addFilter("user-schema-hooks", Schema => {
  Schema.pre("validate", async function(next) {
    const user = this
    const setting = setting(`roles.${user.email}`)
    const configRole = user.emailVerified && setting ? setting : "member"

    if (configRole && configRole != user.role) {
      user.role = configRole
    } else if (user.isModified("role") && configRole != user.role) {
      return next(new Error(`Can not edit role ${user.role}`))
    }

    user.accessLevel = roles()[user.role] || 0

    return next()
  })
})

// CLI admin setup utility
addFilter("cli-add-setup", _ => {
  const setupAdmins = {
    name: "User Roles - Add admin privileges to specific users.",
    value: "admins",
    callback: async ({ inquirer }) => {
      const roles = roles()
      const choices = Object.keys(roles).map(_ => {
        return {
          name: `${_} (${roles[_]})`,
          value: _
        }
      })

      const questions = [
        {
          name: "email",
          message: "What's the user's email?",
          type: "input",
          validate: v => {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(v) ? true : "Enter a valid email address"
          }
        },
        {
          name: "role",
          message: "What is the role for this admin?",
          choices,
          type: "list"
        },
        {
          type: "confirm",
          name: `askAgain`,
          message: `Got it. Add another user?`,
          default: false
        }
      ]

      let admins = {}
      const ask = async () => {
        let { askAgain, email, role } = await inquirer.prompt(questions)
        admins[email] = role
        if (askAgain) await ask()
      }

      await ask()

      await writeConfig("factor-config", { roles: admins })
    }
  }

  return [..._, setupAdmins]
})

function roles() {
  return require("./roles.json")
}