import React, { Component } from 'react';
import { Table, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {
  addProductAction,
  deleteProductAction,
  getProductAction,
  editProductAction,
} from '../redux/action';
import Swal from 'sweetalert2';

class AdminPage extends Component {
  state = {
    selectedProduct: null,
    productdb: this.props.rxProductdb,
    // isEdit: false,
    inputAddTemp: {
      date: '',
      name: '',
      serial: '',
      stock: '',
      category: '',
      price: '',
      status: '',
    },
    inputEditTemp: {
      date: '',
      name: '',
      serial: '',
      stock: '',
      category: '',
      price: '',
      status: '',
    },
  };
  // componentDidUpdate(prevProps, prevState){
  //   if(prevState.selectedProduct !== this.state.selectedProduct){

  //   }
  // };
  renderTable = () => {
    const { rxProductdb } = this.props;
    const { selectedProduct } = this.state;
    console.log(selectedProduct);
    return rxProductdb.map((value, index) => {
      if (selectedProduct === value.id) {
        return (
          <tr>
            <th>{index + 1}</th>
            <td>{value.date}</td>
            <td>
              <Input
                placeholder="Name"
                id="name"
                onChange={this.handleEditInput}
                defaultValue={value.name}
              />
            </td>
            <td>{value.serial}</td>
            <td>
              <Input
                placeholder="Stock"
                id="stock"
                onChange={this.handleEditInput}
                defaultValue={value.stock}
              />
            </td>
            <td>
              <Input
                placeholder="Category"
                id="category"
                onChange={this.handleEditInput}
                defaultValue={value.category}
              />
            </td>
            <td>
              <Input
                placeholder="Price"
                id="price"
                onChange={this.handleEditInput}
                defaultValue={value.price}
              />
            </td>
            <td>
              <Button color="warning" onClick={() => this.handleSaveBtn(value.id)}>
                Save
              </Button>
            </td>
            <td>
              <Button color="danger" onClick={this.handleCancelBtn}>
                Cancel
              </Button>
            </td>
          </tr>
        );
      } else if (value.status === 'avaiable') {
        return (
          <tr>
            <th>{index + 1}</th>
            <td>{value.date}</td>
            <td>{value.name}</td>
            <td>{value.serial}</td>
            <td>{value.stock}</td>
            <td>{value.category}</td>
            <td>Rp{value.price.toLocaleString()}</td>
            <td>
              <Button color="warning" onClick={() => this.handleEditBtn(value.id)}>
                Edit
              </Button>
            </td>
            <td>
              <Button color="danger" onClick={() => this.handleDeleteBtn(value.id)}>
                Delete
              </Button>
            </td>
          </tr>
        );
      }
    });
  };
  handleSaveBtn = (productID) => {
    const { editProductAction } = this.props;
    const { inputEditTemp } = this.state;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Product will be update',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        editProductAction(inputEditTemp, productID);
        this.setState({
          selectedProduct: null,
        });
      }
    });
  };
  handleEditInput = (e) => {
    this.setState({
      inputEditTemp: {
        ...this.state.inputEditTemp,
        [e.target.id]: e.target.value,
      },
    });
    if (e.target.id === 'stock' || e.target.id === 'price') {
      this.setState({
        inputEditTemp: {
          ...this.state.inputEditTemp,
          [e.target.id]: parseInt(e.target.value),
        },
      });
    }
    console.log(this.state.inputEditTemp);
  };
  handleCancelBtn = () => {
    this.setState({
      selectedProduct: null,
    });
  };
  handleEditBtn = (productID) => {
    const { productdb } = this.state;
    const data = productdb.find((value) => value.id === productID);
    return this.setState({
      selectedProduct: productID,
      inputEditTemp: data,
    });
  };
  handleDeleteBtn = (productID) => {
    const { deleteProductAction } = this.props;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteProductAction(productID);
        // this.setState({
        //   inputEditTemp:{
        //     ...inputEditTemp,
        //     status: ''
        //   }
        // })
      }
    });
  };
  handleAddInput = (e) => {
    this.setState({
      inputAddTemp: {
        ...this.state.inputAddTemp,
        [e.target.id]: e.target.value,
      },
    });
    if (e.target.id === 'stock' || e.target.id === 'price') {
      this.setState({
        inputAddTemp: {
          ...this.state.inputAddTemp,
          [e.target.id]: parseInt(e.target.value),
        },
      });
    }
    // console.log(this.state.inputAddTemp);
  };
  handleAddBtn = () => {
    const { addProductAction } = this.props;
    this.setState({
      inputAddTemp: {
        ...this.state.inputAddTemp,
        date: new Date(),
        serial: Date.now(),
        status: 'avaiable',
      },
    });
    Swal.fire({
      title: 'Are you sure?',
      text: 'Product will be uploaded',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Add',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.state.inputAddTemp);
        addProductAction(this.state.inputAddTemp);
      }
    });
  };
  render() {
    return (
      <div className="container my-5 py-5">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Name</th>
              <th>Serial</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <Input
                  placeholder="Date (automacally)"
                  id="date"
                  onChange={this.handleAddInput}
                  disabled
                />
              </td>
              <td>
                <Input placeholder="Name" id="name" onChange={this.handleAddInput} />
              </td>
              <td>
                <Input
                  placeholder="serial (automacally)"
                  id="serial"
                  onChange={this.handleAddInput}
                  disabled
                />
              </td>
              <td>
                <Input placeholder="Stock" id="stock" onChange={this.handleAddInput} />
              </td>
              <td>
                <Input placeholder="Category" id="category" onChange={this.handleAddInput} />
              </td>
              <td>
                <Input placeholder="Price" id="price" onChange={this.handleAddInput} />
              </td>
              {/* <td></td> */}
              <td colSpan={2} className="d-flex">
                <Button color="primary" onClick={this.handleAddBtn}>
                  Add
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

// "id": 1,
//             "date": "2021-01-12T03:20:41.718Z",
//             "name": "Meja Lipat",
//             "serial": 1682697,
//             "stock": 6,
//             "category": "Furniture",
//             "price": 567890,
//             "status": "avaiable"
const mapStateToProps = ({ adminReducer }) => {
  return {
    rxProductdb: adminReducer.productdb,
  };
};

export default connect(mapStateToProps, {
  addProductAction,
  deleteProductAction,
  getProductAction,
  editProductAction,
})(AdminPage);
