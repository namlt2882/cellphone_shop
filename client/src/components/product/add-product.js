import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Tooltip,
  Avatar,
  withStyles,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { CategoryService } from "../../services/category-service";
import { CategoryAction } from "../../actions/category-action";
import { handleCommonError } from "../../utils/request";
import { ProductService } from "../../services/product-service";
import { ProductAction } from "../../actions/product-action";
import { sortProduct } from "../common/custom-filter";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      code: null,
      name: null,
      price: 0,
      description: "",
      categoryId: null
    };
  }

  toogleDialog = () => {
    this.setState(pre => ({ open: !pre.open }));
  };

  onNameChange = name => {
    this.setState({ name: name });
  };
  onCodeChange = code => {
    this.setState({ code: code });
  };
  onPriceChange = price => {
    this.setState({ price: price });
  };
  onDescriptionChange = description => {
    this.setState({ description: description });
  };
  onCategoryChange = categoryId => {
    this.setState({ categoryId: categoryId });
  };

  addProduct = () => {
    ProductService.add({
      code: this.state.code,
      name: this.state.name,
      categoryId: this.state.categoryId,
      price: this.state.price,
      description: this.state.description
    })
      .then(res => {
        let product = res.data;
        if (this.props.system.categoryId == this.state.categoryId) {
          let list = this.props.products
          list.unshift(product)
          sortProduct(list, this.props.system.sortType, this.props.system.rangeValue);
          this.props.setProducts(list)
        }
        this.toogleDialog();
      })
      .catch(err => {
        handleCommonError(err);
        alert(err);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.toogleDialog}>Add product</button>
        <Dialog
          open={this.state.open}
          onClose={this.toogleDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="code"
              label="Code"
              type="text"
              fullWidth
              state={this.state.code}
              onChange={e => {
                this.onCodeChange(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Product name"
              type="text"
              fullWidth
              state={this.state.name}
              onChange={e => {
                this.onNameChange(e.target.value);
              }}
            />

            <FormControl>
              <InputLabel htmlFor="age-native-simple">Category</InputLabel>
              <Select
                native
                value={this.state.categoryId}
                onChange={e => {
                  this.onCategoryChange(e.target.value);
                }}
                inputProps={{
                  name: "categoryId",
                  id: "age-native-simple"
                }}
              >
                <option value="" />
                {this.props.categories.map(val => (
                  <option value={val._id}>{val.name}</option>
                ))}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              state={this.state.price}
              onChange={e => {
                this.onPriceChange(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              state={this.state.description}
              onChange={e => {
                this.onDescriptionChange(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toogleDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addProduct} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  system: state.system,
  categories: state.categories,
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  addProduct: product => {
    dispatch(ProductAction.addProduct(product));
  },
  setProducts: list => {
    dispatch(ProductAction.setProducts(list))
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
