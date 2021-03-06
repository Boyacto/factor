<template>
  <div class="view-home">
    <home-splash />
    <section class="benefits content">
      <section-benefits class="content-pad" />
    </section>

    <section
      v-for="(feature, index) in features"
      :id="feature.id"
      :key="index"
      class="features content"
      :data-test="`feature-` + index"
      :class="[index == features.length - 1 ? 'last' : '']"
    >
      <div class="split-feature" :class="[index % 2 == 0 ? 'even' : 'odd']">
        <div class="feature-content-container">
          <div class="feature-content">
            <home-icon v-if="feature.icon" class="feature-icon" :icon="feature.icon" />
            <h2 class="title">{{ feature.title }}</h2>
            <div class="text">{{ feature.text }}</div>
            <div v-if="feature.link" class="action">
              <factor-link :path="feature.link.path">{{ feature.link.text }} &rarr;</factor-link>
            </div>
          </div>
        </div>
        <div class="feature-figure-container">
          <div v-if="feature.figure" class="figure-container">
            <component :is="feature.figure" />
          </div>
        </div>
      </div>
    </section>

    <div class="quotes-wrap">
      <div class="quotes">
        <div class="quotes-pad">
          <article
            v-for="(quote, index) in quotes"
            :key="index"
            :class="[
              index % 2 == 0 ? 'odd' : 'even',
              index % 4 == 0 || index % 4 == 3 ? 'diagonal' : '',
            ]"
            itemprop="review"
            itemscope
            itemtype="http://schema.org/Review"
          >
            <blockquote itemprop="reviewRating" itemscope itemtype="http://schema.org/Review">
              <div class="quote-media">
                <a class="quote-image" href="#">
                  <img :src="quote.img" alt="quote" />
                </a>
              </div>
              <p class="quote-body" itemprop="reviewBody">"{{ quote.text }}"</p>
              <div
                class="rating"
                itemprop="reviewRating"
                itemscope
                itemtype="https://schema.org/Rating"
              >
                <factor-icon icon="fas fa-star" />
                <factor-icon icon="fas fa-star" />
                <factor-icon icon="fas fa-star" />
                <factor-icon icon="fas fa-star" />
                <factor-icon icon="fas fa-star" />
                <span class="rating-value" itemprop="ratingValue">5</span>
              </div>
              <footer>
                <a
                  :href="quote.link"
                  target="_blank"
                  itemprop="author"
                  itemscope
                  itemtype="https://schema.org/Person"
                >{{ quote.attribution }}</a>
              </footer>
            </blockquote>
          </article>
        </div>
      </div>
    </div>

    <!-- <join-program id="join" /> -->

    <section class="plugins-gallery-section content-pad">
      <plugins-gallery />
    </section>

    <join-dev />
  </div>
</template>

<script lang="ts">
import { factorLink, factorIcon } from "@factor/ui"

export default {
  components: {
    factorLink,
    factorIcon,
    homeSplash: () => import("./splash.vue"),
    homeIcon: () => import("./icon.vue"),
    sectionBenefits: () => import("./section-benefits.vue"),
    //joinProgram: () => import("./el-join.vue"),
    //upgradeFactor: () => import("./el-upgrade.vue"),
    joinDev: () => import("./el-join-dev.vue"),
    pluginsGallery: () => import("../gallery/plugins-gallery.vue"),
  },
  data(this: any) {
    return {
      loading: true,
      loadingButtons: true,
      features: [
        {
          icon: "powered",
          title: `100% JavaScript apps made simple.`,
          text: `Build 100% JavaScript apps with best-of-class open source software.
            No more backend and frontend, Factor has a single environment you can use to build full-stack apps.`,
          figure: () => import("./figure-powered-by.vue"),
          link: { path: "/docs", text: "View Docs" },
        },
        {
          icon: "ssr",
          title: "A Modern Alternative to WordPress",
          text: `Factor helps you bring together all the different tools you'll need to build great apps.
              Add advanced features easily and quickly optimize things for SEO,
             marketing, and performance.`,
          figure: () => import("./figure-live-changes.vue"),
          link: { path: "/install", text: "Install Factor" },
        },
        {
          icon: "dashboard2",
          title: "Manage your users and content.",
          text: `Factor comes with a professional dashboard and content management framework.
            It's ideal for eCommerce, blogs, users, and more. Use it for simple or advanced tasks.`,
          figure: () => import("./figure-dashboard.vue"),
          link: { path: "/docs", text: "Learn More" },
        },
        {
          id: "plugins-feature",

          title: `Plugins that "just work."`,
          text: `Most coding frameworks make you do way too much custom coding. Their plugins can take days to learn, install, and customize.
          Factor focuses on making plugins dead simple. This means they "just work," but can be easily customized.`,
          figure: () => import("./figure-plugins.vue"),
          link: { path: "/plugins", text: "View Plugins" },
        },
        {
          title: "Great design made simple.",
          text: `Leverage an amazing theme library or build your own for fun and profit.
              Factor gives you a complete theming and rapid app development system to quickly deploy apps.`,
          figure: () => import("./figure-themes.vue"),
          link: { path: "/themes", text: "View Themes" },
        },
      ],
      quotes: [
        {
          text: `Really enjoying @factordev! Brilliant design here, you can basically do everything with a plugin. #js #factordev`,
          attribution: "Justin Keller, CEO ElasticByte",
          img: require("./img/elastic-byte.svg"),
          link: "https://elasticbyte.net",
        },
        {
          text: `wow! So impressed with the speed and ease of use of @factordev for creating universal #vuejs apps 💨 #factorjs`,
          attribution: "Nick Dryburgh, Relic Games co.",
          img: require("./img/zeno.svg"),
        },
      ],
    }
  },
  mounted(this: any) {
    setTimeout(() => {
      this.loadingButtons = false
    }, 1000)
  },
  methods: {},
  metaInfo() {
    return {
      title: "The JavaScript CMS",
      description:
        "Factor is a modular JavaScript framework that helps you build websites, blogs, and eCommerce.",
    }
  },
}
</script>
<style lang="less">
.view-home {
  overflow: hidden;
  .content-pad {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5em;
    width: 100%;
    z-index: 10;
    position: relative;
  }

  .benefits {
    .content-pad {
      padding-top: 8rem;
      padding-bottom: 10rem;
      @media (max-width: 900px) {
        padding-top: 6rem;
        padding-bottom: 3rem;
      }
    }
  }

  .features {
    &.content {
      &.last {
        box-shadow: none;
      }
      @media (max-width: 900px) {
        padding: 4rem 0;
        box-shadow: none;
      }
    }
    .split-feature {
      display: grid;
      grid-column-gap: 3rem;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: "a b";
      align-items: center;
      min-height: 80vh;
      &.even {
        .feature-content-container {
          justify-self: flex-end;
        }
      }
      &.odd {
        grid-template-areas: "b a";
        .feature-figure-container {
          justify-content: flex-end;
          @media (max-width: 900px) {
            justify-content: center;
          }
        }
      }
      .feature-content-container {
        grid-area: a;
        min-width: 0;
        .feature-content {
          padding: 10rem 1.5rem;
          max-width: 550px;
        }
      }
      .feature-figure-container {
        grid-area: b;
        min-width: 0; // defaults content width
        height: 100%;
        position: relative;
        // width: 100%;
        display: flex;
        align-items: center;
        .figure-container {
          max-width: 100%;
        }
      }
      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        grid-template-areas: "a" "b";
        &.odd {
          grid-template-areas: "a" "b";
        }
        .feature-content-container {
          .feature-content {
            padding: 3rem 1.5rem 1rem;
            max-width: 100%;
          }
        }
        .feature-figure-container {
          justify-content: center;
        }
      }
    }

    .feature-content {
      letter-spacing: -0.01em;
    }
    .feature-icon {
      height: 72px;
      width: 72px;
      margin-bottom: 1rem;
      box-shadow: 0px 2px 3px rgba(50, 50, 93, 0.13), 0px 2px 5px rgba(50, 50, 93, 0.11),
        0px 5px 15px rgba(0, 0, 0, 0.07);
      border-radius: 6px;
    }
    .title {
      font-weight: 700;
      font-size: 3em;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    .text {
      font-weight: 400;
      font-size: 1.4em;
      line-height: 1.6;
      margin-bottom: 1rem;

      color: var(--color-text-secondary);
    }
    .action {
      font-weight: 500;
      font-size: 1.3em;
    }
    @media (max-width: 900px) {
      .title {
        font-size: 1.8em;
      }
      .text {
        font-size: 1.1em;
      }
    }
  }

  .quotes-wrap {
    position: relative;
    background-image: url("./img/dot.svg");
    margin-top: 6em;
    margin-bottom: 6em;

    .quotes {
      transform: skewY(-10deg);

      .quotes-pad {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 4em;
        perspective: 800px;
      }
      @media (max-width: 900px) {
        .quotes-pad {
          grid-template-columns: 1fr;
          article:nth-child(odd),
          article:nth-child(even) {
            transform: none;
            margin: 0 auto;
          }
          article {
            blockquote {
              padding: 4rem 2rem;
              text-align: left;
              .quote-media {
                text-align: left;
              }
            }
          }
        }
      }
      article {
        position: relative;
        display: flex;

        &:nth-child(odd) {
          transform: rotateX(2deg) rotateY(7deg);
          //    background-image: linear-gradient(45deg, #fff, #f7f7f7);
          blockquote {
            box-shadow: 1px 1px 4px 0 rgba(26, 26, 67, 0.1),
              -5px 22.5px 65px 0 rgba(50, 50, 93, 0.2);
          }
        }
        &:nth-child(even) {
          transform: rotateX(1deg) rotateY(-7deg);
          // background-image: linear-gradient(45deg, #fff, #f7f7f7);
          blockquote {
            box-shadow: 1px 1px 4px 0 rgba(26, 26, 67, 0.1),
              19px 22.5px 75px -5px rgba(50, 50, 93, 0.2);
          }
        }
        &.odd {
          justify-content: flex-end;
        }
        blockquote {
          transform: skewY(10deg);

          max-width: 550px;
          padding: 8rem 4rem;
          font-size: 1.4em;
          line-height: 1.8;
          text-align: center;
          background: #fff;
          border-radius: 6px;

          .quote-media {
            display: block;
            text-align: center;
            a {
              display: inline-block;
              width: 100px;

              img {
                display: block;
                width: 100%;
              }
            }

            margin-bottom: 1rem;
          }
          footer {
            margin-top: 1rem;
            text-transform: uppercase;

            font-size: 0.8em;
            font-weight: 500;
          }
          .rating-value {
            display: none;
          }
        }
      }
    }
  }

  .plugins-gallery-section {
    padding: 6em 1.5em;
  }
}
</style>
