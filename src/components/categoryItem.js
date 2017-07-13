
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions
} from 'react-native';

const HORIZONTAL_PADDING = 6;
const { width, height } = Dimensions.get('window');
class RenderItem extends React.Component {
     navigate = (id) => {
        switch (id) {
        case 'comfy':
            return Actions.comfy();
        case 'enKnowledge':
            return Actions.enKnowledge();
        case 'enEvent':
            return Actions.enEvent();
        case 'Care':
            return Actions.Care();
        case 'fillTummy':
            return Actions.fillTummy();
        case 'health':
            return Actions.health();
        case 'helpHand':
            return Actions.helpHand();
        case 'lookBetter':
            return Actions.lookBetter();
        default:
            break;
        }
    }
    render(){
        return (
            <TouchableOpacity onPress={() => this.navigate(this.props.data.id)}>
                <Image source={this.props.data.image} style={styles.itemImageStyle} >
                    <Text style={styles.placeholderItemNameStyle}> {this.props.data.name} </Text>
                </Image>
            </TouchableOpacity>

        );
    }
}

export default RenderItem;

const styles = StyleSheet.create({
  
  itemImageStyle: {
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'flex-end',
  	width: (width / 2) - HORIZONTAL_PADDING,
  	height: 160,
  },
  placeholderItemNameStyle: {
  	textAlign: 'center',
  	justifyContent: 'center',
  	marginBottom: 5,
  	fontSize: 15,
  	color: 'white',
  	fontWeight: 'bold',
  	backgroundColor: '#0000007F',
  	borderRadius: 5,
  	paddingLeft: 1,
  	paddingRight: 3,
  	overflow: 'hidden'
  },
});
