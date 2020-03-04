import React, { Component } from "react";
import { connect } from "react-redux";
import { ProductAction } from "../../actions/product-action";
import { ProductService } from "../../services/product-service";
import { handleCommonError } from "../../utils/request";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  Paper,
  Grid
} from "@material-ui/core";

class ProductList extends Component {
  render() {
    let { products } = this.props;
    products = products.filter(pro => pro._show);
    return (
      <Grid item xs={8}>
        <i>
          <font size="3">Found {products.length} product(s) in DB...</font>
        </i>
        <TableContainer component={Paper}>
          <Table className={this.props.classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((val, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{val.code}</TableCell>
                  <TableCell>{val.name}</TableCell>
                  <TableCell>{val.price}</TableCell>
                  <TableCell>{val.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  }
}

const useStyles = {
  table: {
    minWidth: 650
  }
};

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  setProducts: list => {
    dispatch(ProductAction.setProducts(list));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ProductList));
