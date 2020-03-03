import React, { Component } from "react";
import { connect } from "react-redux";
import { CategoryAction } from "../../actions/category-action";

import { CategoryService } from "../../services/category-service";
import { handleCommonError } from "../../utils/request";
import {
  Avatar,
  makeStyles,
  withStyles,
  Grid,
  Tooltip
} from "@material-ui/core";
import { deepOrange, green } from "@material-ui/core/colors";

class CategoryList extends Component {
  componentDidMount() {
    CategoryService.getAll()
      .then(res => {
        this.props.setCategories(res.data);
      })
      .catch(err => {
        handleCommonError(err);
      });
  }

  render() {
    const classes = this.props.classes;
    let categories = this.props.categories;
    return [
      <Grid item xs={8}>
        <div className={classes.root} style={{ overflowX: "auto" }}>
          {categories.map(val => (
            <Tooltip title={val.name} arrow>
              <Avatar variant="square" className={classes.square}>
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
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
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
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  setCategories: list => {
    dispatch(CategoryAction.setCategories(list));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CategoryList));
