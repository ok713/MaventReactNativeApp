import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, AsyncStorage, Platform, Text, Image } from 'react-native';
import { Container, Content } from 'native-base';
import Carousel from 'react-native-looped-carousel';
import { Actions } from 'react-native-router-flux';
import RenderItem from '../../components/categoryItem'
import Search from 'react-native-search-box';


const { width, height } = Dimensions.get('window');

const imageDetails = [
        {
          name: 'Get a Service',
          id: 'service',
          image: require('../../../assets/images/ListView/Get_a_service.jpg')
        },
        {
          name: 'Learn a Skill',
          id: 'learn',
          image: require('../../../assets/images/ListView/Learn_a_skill.jpeg')
        },
        {
          name: 'Provide a Service',
          id: 'provide',
          image: require('../../../assets/images/ListView/Provide_service.jpg')
        },
        {
          name: 'Teach a Skill',
          id: 'teach',
          image: require('../../../assets/images/ListView/teach_skill.jpeg')
        },
  ];


class CategoryView extends Component {
    
    componentDidMount() {
        Actions.refresh({rightButtonImage:require('../../../assets//icons/mailoutline.png')})
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Carousel
                    delay={6000}
                    style={styles.carouselItem}
                    autoplay
                    pageinfo
                >
                    <View style={styles.carouselItem}>
                        <Image source={require('../../../assets/images/CarouselView/Image2-1.jpg')} style={styles.carouselImage} />
                    </View>

                    <View style={styles.carouselItem}>
                        <Image source={require('../../../assets/images/CarouselView/Image1.jpg')} style={styles.carouselImage} />
                    </View>

                    <View style={styles.carouselItem}>
                        <Image source={require('../../../assets/images/CarouselView/Image3-1.jpg')} style={styles.carouselImage} />
                    </View>
                </Carousel>
                <Container>
                    <Content style={{width:width}}>
                       {imageDetails.map((item,index)=>{
                           if(index % 2 ==0){
                            return <View key={index} style={{flexDirection:'row', paddingTop:3, justifyContent:'space-around', alignItems:'flex-start'}}>
                                <RenderItem data={imageDetails[index]} />
                                {
                                    imageDetails[index+1] &&
                                        <RenderItem data={imageDetails[index+1]} />
                                }
                            </View>
                           }
                        })}
                    </Content>
                </Container>
                
              
            </View>

        );
    }
}

const styles = StyleSheet.create({
    carouselItem: {
        width: width, height: height / 4.5
    },
    carouselImage: {
        width: width, height: 160
    },
    list: {
        borderWidth:1, width:width, height:height,backgroundColor:'red',

  },

});

export default CategoryView;
