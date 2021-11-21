import React from 'react';
// import { DataTable, Checkbox, DataTableSkeleton, Pagination } from 'carbon-components-react';
// import { Filter16 } from '@carbon/icons-react';
import axios from 'axios';
import { Table } from 'antd';

// const {
//   Table,
//   TableBody,
//   TableContainer,
//   TableHead,
//   TableHeader,
//   TableRow,
//   TableSelectAll,
//   TableToolbar,
//   TableToolbarContent,
//   TableToolbarMenu,
//   TableToolbarSearch,
// } = DataTable;

const columns = [
  {
    title: 'Country',
    dataIndex: 'country',
    filters: [
      {
        text: 'Cameroon',
        value: 'Cameroon',
      },
      {
        text: 'Ethiopia',
        value: 'Ethiopia',
      },
      {
        text: 'Morocco',
        value: 'Morocco',
      },
      {
        text: 'Mozambique',
        value: 'Mozambique',
      },
      {
        text: 'Uganda',
        value: 'Uganda',
      },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.country.includes(value),
    width: '25%',
  },
  {
    title: 'State',
    dataIndex: 'valid',
    filters: [
      {
        text: 'Valid',
        value: 'Valid',
      },
      {
        text: 'Invalid',
        value: 'Invalid',
      },
    ],
    onFilter: (value, record) => record.valid.includes(value),
    filterSearch: true,
    width: '25%',
  },
  {
    title: 'Country Code',
    dataIndex: 'countryCode',
    width: '25%',
  },
  {
    title: 'Number',
    dataIndex: 'number',
    width: '25%',
  },
];

class NumbersLister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      selectedExperiences: [],
      searchTerm: '',
      selectedCountry: '',
      selectedState: '',
      loading: true,
      error: '',
    };
  }

  componentDidMount() {
    this.getNumbers();
  }

  getNumbers = () => {
    axios
      .get(`http://localhost:8080/api/numbers`)
      .then((res) => {
        this.setState({ loading: false });
        let numbers = res.data;
        numbers = numbers.map((n) => {
          n.valid = n.valid ? 'Valid' : 'Invalid';
          return n;
        });
        // console.log(res);
        // console.log(numbers);
        this.setState({ numbers: numbers });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        this.setState({
          error: error.message ? error.message : 'Server error',
        });
      });
  };

  render() {
    return (
      <>
        {this.state.error !== '' ? <h1>{this.state.error}</h1> : ''}
        <Table columns={columns} dataSource={this.state.numbers} />
      </>
    );
  }
}

export default NumbersLister;
