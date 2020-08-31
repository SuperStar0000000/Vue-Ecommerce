import cProductWindow from "@/components/cProductWindow/index.vue";
import cProductNavbar from "@/components/cProductNavbar/index.vue";
import Loading from "vue-loading-overlay";

export default {
  name: "vProducts",
  props: {},
  components: {
    cProductWindow,
    cProductNavbar,
    Loading
  },
  data: function() {
    return {
      navbar_info: [],
      filterData_type: {
        show: true,
        option: [
          {
            title: "T-Shirts",
            check: false
          },
          {
            title: "Longsleeves",
            check: false
          },
          {
            title: "Tank Tops",
            check: false
          },
          {
            title: "Dress shirts",
            check: false
          }
        ]
      },
      filterData_price: {
        show: true,
        min: 0,
        max: 500,
        sliderValue: 0
      },
      filterData_size: {
        show: true,
        sizeData: [
          {
            title: "S"
          },
          {
            title: "M"
          },
          {
            title: "L"
          },
          {
            title: "XL"
          }
        ]
      },
      conditionBar: {
        sort: {
          title: "Sort",
          curValue: "default",
          options: [
            {
              displayName: "DEFAULT",
              value: "default"
            },
            {
              displayName: "POPULAR",
              value: "popular"
            },
            {
              displayName: "PRICE LOW TO HIGH",
              value: "lowPrice"
            },
            {
              displayName: "PRICE HIGH TO LOW",
              value: "highPrice"
            }
          ]
        }
      }
    };
  },
  methods: {
    onTypeShowHandler: function() {
      this.filterData_type.show = !this.filterData_type.show;
    },
    onPriceShowHandler: function() {
      this.filterData_price.show = !this.filterData_price.show;
    },
    onSizeShowHandler: function() {
      this.filterData_size.show = !this.filterData_size.show;
    }
  },
  computed: {
    styleTypeSelect: function() {
      return {
        height: !this.filterData_type.show ? "0px" : ""
      };
    },
    stylePriceSelect: function() {
      return {
        height: !this.filterData_price.show ? "0px" : ""
      };
    },
    styleSizeSelect: function() {
      return {
        height: !this.filterData_size.show ? "0px" : ""
      };
    },
    styleArrow: function() {
      return function(value) {
        switch (value) {
          case "type":
            return {
              transform: !this.filterData_type.show ? " rotateX(180deg)" : ""
            };
          case "price":
            return {
              transform: !this.filterData_price.show ? " rotateX(180deg)" : ""
            };
          case "size":
            return {
              transform: !this.filterData_size.show ? " rotateX(180deg)" : ""
            };
          default:
            return {};
        }
      };
    },
    matchID: function() {
      return function(value) {
        return `check-box-${value}`;
      };
    },
    test: function() {
      return "hello";
    },
    conditionBarTitle: function() {
      let first_name = "Default";
      let trail_name = "'s Tops";
      this.navbar_info = [];
      this.navbar_info[0] = {
        displayName: "All Product",
        params: "all-products"
      };
      switch (this.$route.params.id) {
        case "all-products":
          first_name = `All Product`;

          break;
        case "men":
          first_name = `Men`;
          this.navbar_info[1] = {
            displayName: "Men",
            params: this.$route.params.id
          };
          break;
        case "women":
          first_name = `Women`;
          this.navbar_info[1] = {
            displayName: "Women",
            params: this.$route.params.id
          };
          break;
        case "kids":
          first_name = `Kids`;
          this.navbar_info[1] = {
            displayName: "Kids",
            params: this.$route.params.id
          };
          break;
      }

      return first_name + trail_name;
    },
    navBarInfo: function() {
      return [
        {
          displayName: `${this.conditionBarTitle}`
        }
      ];
    },
    products: function() {
      return this.$store.getters["products"];
    },
    isLoading: function() {
      return this.$store.state.isLoading.getProductList;
    }
  },
  watch: {
    $route: {
      handler: function() {
        // console.log("-- watch / newName: ", newName, " / oldName: ", oldName);
        // this.conditionBar.title = newName.params.id;
        this.$store.dispatch("GetProductList");
      },
      deep: true
    }
  },
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    this.$store.dispatch("GetProductList");
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {}
};
