import React, { Component } from "react";
import { connect } from "react-redux";
import { SystemAction } from "../../actions/system-action";
import { ProductAction } from "../../actions/product-action";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  withStyles,
  Typography,
  Slider,
  Container
} from "@material-ui/core";
class CustomFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: props.system.sortType,
      rangeValue: props.system.rangeValue
    };
  }

  onChangeSortType = val => {
    let { products, system } = this.props;
    this.setState({ sortType: val });
    this.props.setSortType(val);

    sortProduct(products, val, system.rangeValue);
    this.props.setProducts(products);
  };

  handleRangeValueChange = (event, newValue) => {
    let { products, system } = this.props;
    this.setState({ rangeValue: newValue });
    this.props.setRangeValue(newValue);

    sortProduct(products, system.sortType, newValue);
    this.props.setProducts(products);
  };
  getValueText = val => {
    return `${val}$`;
  };
  render() {
    let { classes } = this.props;

    return (
      <div>
        <Container>
          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Price range
            </Typography>
            <Slider
              style={{ marginTop: "30px" }}
              value={this.state.rangeValue}
              onChange={this.handleRangeValueChange}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              max={2000}
              step={50}
              getAriaValueText={this.getValueText}
            />
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Sort by price</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.sortType}
              onChange={e => {
                this.onChangeSortType(e.target.value);
              }}
            >
              {this.state.sortType === 0 ? (
                <MenuItem value={0}>Default</MenuItem>
              ) : null}
              <MenuItem value={-1}>High price</MenuItem>
              <MenuItem value={1}>Low price</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </div>
    );
  }
}

export const sortProduct = (products, val, rangeValue) => {
  products.forEach(pro => {
    if (pro.price >= rangeValue[0] && pro.price <= rangeValue[1]) {
      pro._show = true;
    } else {
      pro._show = false;
    }
  });
  switch (val) {
    case 1:
      products.sort((a, b) => a.price - b.price);
      break;
    case -1:
      products.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }
};

const useStyles = theme => ({
  root: {
    width: 180
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

const mapStateToProps = state => ({
  system: state.system,
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  setSortType: val => {
    dispatch(SystemAction.setSortType(val));
  },
  setProducts: list => {
    dispatch(ProductAction.setProducts(list));
  },
  setRangeValue: val => {
    dispatch(SystemAction.setRangeValue(val));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(CustomFilter));
