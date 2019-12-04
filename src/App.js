import React from 'react';
import './App.css';
import styled from "styled-components"


const Table = styled.table`
  border-radius: 4px;
  border-collapse: collapse;
  overflow: hidden;
  width: 96%;
  margin: auto;
  text-align:center;
`;

const Th = styled.th`
    padding: 10px 40px;
    color: #7b0046;
`;

const Td = styled.td`
    padding: 10px 40px;
    color: #3F3F3F;

   &:last-child {
      transition: 0.3s;
      padding: 0;
      margin: 0;
      border: none;
      width: 0;
    }
`;

const Dots = styled.td`
padding: 10px;
width: 0;
`;

const Thead = styled.thead`
  background-color: #fff;
`;

const TrHead = styled.tr`
  border-bottom: 2px solid #7b0046;
  background-color: #fff;

  &:first-child:hover {
    background-color: #fff;
  }
`;

const Tr = styled.tr`
   background-color: #fff;
   transition: 0.3s;

   &:hover {
    background-color: rgba(87, 115, 211, .1);
   }
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            iNPP: '',
            phone_number: '',
            adressa: '',
            deleteIndex:0,
            updatedNumber:'',
            updateId:0
        }
    }

    componentDidMount() {
        this.updateData();
    }
    updateData = () => {
        fetch("http://localhost:4000/abonenty")
            .then(res => res.json())
            .then(data => this.setState({data: data}))
            .catch(err => console.log(err))
    };

    renderRow = () => {
        const {data} = this.state;
        if (data.length) {
            return data.map(city => {
                return (
                    <Tr key={city.id_abonenta}>
                        {Object.keys(city).map((key, index) => {
                            return <td key={index}>{city[key]}</td>;
                        })}
                        <button id={city.id_abonenta} onClick={this.deleteCity}>Delete</button>
                    </Tr>
                );
            });
        } else {
            return null;
        }
    };
    deleteCity = e => {
        const id = e.target.id;
        if (id){
            fetch(`http://localhost:4000/delete?id=${id}`)
                .then(res => this.updateData())
                .catch(err => console.log(err))
        }
    };
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    onSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/add?iNPP=${this.state.iNPP}&n=${this.state.phone_number}&adressa=${this.state.adressa}`)
            .then(res =>  this.updateData())
            .catch(err => console.log(err));
    };

    updateNumber = e => {
        e.preventDefault();
        fetch(`http://localhost:4000/update?n=${this.state.updatedNumber}&id=${this.state.updateId}`)
            .then(res =>  this.updateData())
            .catch(err => console.log(err));
    };
    render() {
        const {data} = this.state;
        if (data.length)
            return (
                <div>
                    <Table>
                        <Thead>
                            <TrHead>
                                {Object.keys(data[0]).map(key => {
                                    return <Th key={key}>{key}</Th>;
                                })}
                            </TrHead>
                        </Thead>
                        <tbody>{this.renderRow()}</tbody>
                    </Table>
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder='iNPP'
                            onChange={this.onChange}
                            name='iNPP'
                            required
                        />
                        <input
                            type="text"
                            placeholder='phone_number'
                            onChange={this.onChange}
                            name='phone_number'
                            required
                        />
                        <input
                            type="text"
                            placeholder='adressa'
                            onChange={this.onChange}
                            name='adressa'
                            required
                        />
                        <button type='submit'>add</button>
                    </form>
                    <br/>
                    <form onSubmit={this.updateNumber}>
                        <input
                            placeholder='phone number'
                            onChange={this.onChange}
                            name='updatedNumber'
                            required
                            type="text"/>
                        <input
                            placeholder='which id you want to update'
                            onChange={this.onChange}
                            name='updateId'
                            required
                            type="text"/>
                        <button type='submit'>update</button>
                    </form>
                </div>
            );
        else return null
    }
}

export default App;
