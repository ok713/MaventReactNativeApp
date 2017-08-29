
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const HORIZONTAL_PADDING = 3;
const { width, height } = Dimensions.get('window');
const service = [
      {
        name: 'Cooking & Baking',
        id: 'cooking',
        image: require('../../assets/images/subCategories/get_a_service/Cooking_Baking.jpeg')
      },
      {
        name: 'Installation & reparation of gadgets',
        id: 'gadgets',
        image: require('../../assets/images/subCategories/get_a_service/Gadgets.jpg')
      },
      {
        name: 'Home Improvement',
        id: 'improvement',
        image: require('../../assets/images/subCategories/get_a_service/Home_Improvement.jpg')
      },
      {
        name: 'Cleaning',
        id: 'clean',
        image: require('../../assets/images/subCategories/get_a_service/cleaning.jpg')
      },
      {
        name: 'Beauty',
        id: 'beauty',
        image: require('../../assets/images/subCategories/get_a_service/Beauty.jpg')
      },
      {
        name: 'Photography & videography',
        id: 'photography',
        image: require('../../assets/images/subCategories/get_a_service/Photography_videography.jpeg')
      },
      {
        name: 'Art & Design',
        id: 'art',
        image: require('../../assets/images/subCategories/get_a_service/Art_Design.jpeg')
      },
      {
        name: 'Home Care',
        id: 'care',
        image: require('../../assets/images/subCategories/get_a_service/Homecare.jpg')
      },
      {
        name: 'Pet related',
        id: 'pet',
        image: require('../../assets/images/subCategories/get_a_service/Pet_related.jpeg')
      },
      {
        name: 'Others',
        id: 'others',
        image: require('../../assets/images/subCategories/get_a_service/Others.jpeg')
      },
      
    ];
const learn = [
      {
        name: 'School subjects',
        id: 'scholl',
        image: require('../../assets/images/subCategories/Learn_a_skill/School_Subjects.jpg')
      },
      {
        name: 'Art & Design',
        id: 'art',
        image: require('../../assets/images/subCategories/Learn_a_skill/Art_design_class.jpeg')
      },
      {
        name: 'Information Technology',
        id: 'information',
        image: require('../../assets/images/subCategories/Learn_a_skill/Information_Technology.jpg')
      },
      {
        name: 'Sports & Fitness',
        id: 'sports',
        image: require('../../assets/images/subCategories/Learn_a_skill/Sports_fitness.jpeg')
      },
      {
        name: 'Music',
        id: 'music',
        image: require('../../assets/images/subCategories/Learn_a_skill/music.jpeg')
      },
      {
        name: 'Cooking & Baking',
        id: 'cooking',
        image: require('../../assets/images/subCategories/Learn_a_skill/cooking_baking_classes.jpg')
      },
      {
        name: 'Others',
        id: 'others',
        image: require('../../assets/images/subCategories/Learn_a_skill/Other_skills.jpeg')
      },
      
    ];
  
class RenderItem extends React.Component {
     navigate = (id) => {
         let data = [];
        switch (id) {
        case 'service':
            data = service;
            break;
        case 'learn':
            data = learn;
            break;
        case 'provide':
            data = service;
            break;
        case 'teach':
            data = learn;
            break;
        default:
            break;
        }
        Actions.subCategory({data:data, title:this.props.data.name});
    }
    render(){
        return (
            <TouchableOpacity onPress={() => this.navigate(this.props.data.id)}>
                <Image source={this.props.data.image} style={styles.itemImageStyle} >
                  <View style={{ position:'absolute', width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.3)' }}/>
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
  	alignItems: 'center',
  	width: (width / 2) - HORIZONTAL_PADDING,
  	flex:0.5
  },
  placeholderItemNameStyle: {
  	textAlign: 'center',
  	fontSize: 18,
  	color: '#fff',
  	fontWeight: 'bold',
  },
});
