import React from 'react';
import { IAssetData } from '../App';

//this file defines the React component that renders a single asset to the browser window
//it also contains the logic to change asset properties and save the changes to the database
//most of the used React framework features are already explained in the comments of App.js
//so this code hopefully mostly explains itself ...

interface IProps {
    onDelete: Function;
    edit: boolean;
    asset: IAssetData;
}


interface IState {
    delete_function: any;
    edit_mode: boolean;
    asset: IAssetData;
}

export default class SimpleAsset extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        //one new thing is, that the state will be initialized by properties that are set when the component is created in the container element:
        //look for "<SimpleAsset key={newAsset._id} onDelete={this.handleDeleteAsset} edit={true} asset={newAsset} />" in App.js
        this.state = {
            delete_function: props.onDelete,
            edit_mode: props.edit,
            asset: props.asset,
        }
    }

    render() {

        //if the component is in edit mode, it will render different than if it just shows the data

        if (this.state.edit_mode)
            return (
                <tr>
                    <td><input type="text" name="name" value={this.state.asset.asset_name} onChange={this.handleNameChange} /></td>
                    <td><input type="number" name="value" value={this.state.asset.asset_value} onChange={this.handleValueChange} /> €</td>
                    <td><button onClick={this.handleSave} id={this.state.asset._id}>save</button></td>
                </tr>
            )
        else
            return (
                <tr>
                    <td>{this.state.asset.asset_name}</td>
                    <td>{this.state.asset.asset_value} €</td>
                    <td>
                        <button onClick={this.handleEdit}>edit</button>
                        <button onClick={this.state.delete_function} id={this.state.asset._id}>sell or dispose</button>
                    </td>
                </tr>
            )
    }

    handleEdit() {
        this.setState({ edit_mode: true });
    }
    handleNameChange(event: any) {
        const inputElement = event.target as HTMLInputElement;
        this.setState({
            asset: {
                _id: this.state.asset._id,
                asset_name: inputElement.value,
                asset_value: this.state.asset.asset_value
            }
        });
    }
    handleValueChange(event: any) {
        const inputElement = event.target as HTMLInputElement;
        this.setState({
            asset: {
                _id: this.state.asset._id,
                asset_name: this.state.asset.asset_name,
                asset_value: parseFloat(inputElement.value)
            }
        });
    }

    handleSave(event: any) {
        this.setState({ edit_mode: false });
    }

}