import React, { Component } from "react";
import { connect } from "react-redux";
import { CategoryAction } from "../../actions/category-action";
import { SystemAction } from "../../actions/system-action";

import { CategoryService } from "../../services/category-service";
import { handleCommonError } from "../../utils/request";
import { Avatar, withStyles, Grid, Tooltip } from "@material-ui/core";
import { deepOrange, green } from "@material-ui/core/colors";
import { ProductService } from "../../services/product-service";
import { ProductAction } from "../../actions/product-action";

class CategoryList extends Component {
  componentDidMount() {
    CategoryService.getAll()
      .then(res => {
        let list = res.data;
        this.props.setCategories(list);
        if (list.length > 1) {
          this.setChoosingCategory(list[0]._id);
        } else {
          this.props.setChoosingCategory(null);
        }
      })
      .catch(err => {
        handleCommonError(err);
      });
  }

  setChoosingCategory = categoryId => {
    this.props.setChoosingCategory(categoryId);
    ProductService.getByCategory(categoryId)
      .then(res => {
        this.props.setProducts(res.data);
      })
      .catch(e => {
        handleCommonError(e);
      });
  };

  render() {
    let { classes, categories, system } = this.props;

    return [
      <Grid item xs={8}>
        <div className={classes.root} style={{ overflowX: "auto" }}>
          {categories.map(val => (
            <Tooltip title={val.name} arrow>
              <Avatar
                variant="square"
                className={
                  system.categoryId === val._id ? classes.orange : classes.green
                }
                onClick={() => {
                  this.setChoosingCategory(val._id);
                }}
              >
                {val.name}
              </Avatar>
            </Tooltip>
          ))}
        </div>
      </Grid>,
      <Grid item xs={2}>
        <Tooltip title="Add new category" arrow>
          <Avatar className={classes.rounded}>+</Avatar>
        </Tooltip>
      </Grid>
    ];
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: "150px",
    cursor: "pointer"
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
    width: "150px",
    cursor: "pointer"
  },
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
    cursor: "pointer"
  }
});

const mapStateToProps = state => ({
  categories: state.categories,
  system: state.system,
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  setCategories: list => {
    dispatch(CategoryAction.setCategories(list));
  },
  setChoosingCategory: categoryId => {
    dispatch(SystemAction.setChoosingCategory(categoryId));
  },
  setProducts: list => {
    dispatch(ProductAction.setProducts(list));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CategoryList));
