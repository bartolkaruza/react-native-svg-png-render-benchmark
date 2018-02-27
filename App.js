import React, {Component} from 'react';
import {
    Image,
    Platform, ScrollView,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';

import {G, Path, Polygon} from 'react-native-svg';
import SvgIcon from 'react-native-svg-icon';

const pngs = [
    require('./assets/cube1.png'),
    require('./assets/cube2.png'),
    // require('./assets/cube3.png'),
];

const svgs = {
    // cube1:
    //     {
    //         svg: <G>
    //             <Path d="M251.84,0l-224,129.312v245.056l224,129.312l224-129.312V129.312L251.84,0z M235.84,457.504l-176-101.664V166.256
    // 	l176,101.584V457.504z M75.84,138.544l176-101.616l176,101.616l-176,101.632L75.84,138.544z M443.84,355.84l-176,101.6v-189.6
    // 	l176-101.616V355.84z"/>
    //         </G>,
    //         viewBox: '0 0 503.68 503.68',
    //         style: 'enable-background:new 0 0 503.68 503.68;'
    //     },
    cube0:
        {
            svg: <G>
                <Polygon style="fill:#434C6D;" points="29,58 3,45 3,13 29,26 	"/>
                <Polygon style="fill:#556080;" points="29,58 55,45 55,13 29,26 	"/>
                <Polygon style="fill:#7383BF;" points="3,13 28,0 55,13 29,26 	"/>
            </G>,
            viewBox:
                '0 0 58 58'
        },
    cube1:
        {
            svg: <G>
                <Polygon style="fill:#BCBBAF;"
                         points="218.745,218.21 218.745,218.81 29.365,328.15 29.305,328.11 29.305,109.37 29.775,109.1 "/>
                <Polygon style="fill:#E2E0D0;" points="218.745,218.81 218.745,437.48 29.365,328.15 "/>
                <Polygon style="fill:#C97E6F;"
                         points="408.175,109.37 408.175,328.11 408.115,328.14 218.745,218.81 218.745,218.21 407.715,109.1"/>
                <Polygon style="fill:#E59683;" points="408.115,328.14 218.745,437.48 218.745,218.81 "/>
                <Polygon style="fill:#E59683;" points="407.715,109.1 218.745,218.21 218.745,0 "/>
                <Polygon style="fill:#E2E0D0;" points="218.745,0 218.745,218.21 29.775,109.1 "/>
            </G>,
            viewBox:
                '0 0 437.48 437.48'
        }
};

const Icon = (props) => <SvgIcon {...props} svgs={svgs}/>;

const imageIndices = [];
for (let x = 0; x < 200; ++x) {
    imageIndices.push(x % 2);
}

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderImages: false,
            renderSvgs: false
        }
    }

    componentDidMount = () => {
        this.loopSwap();
    };

    loopSwap = () => {
        setTimeout(() => {
            const {renderImages, renderSvgs} = this.state;
            this.setState({
                renderImages: false,
                renderSvgs: false,
                startedSwitch: true,
                renderStart: new Date().getTime(),
                renderTime: 0
            });

            setTimeout(() => {
                // Alert.alert('SWITCHING');
                svgRender = renderSvgs || !renderImages && !renderSvgs;
                this.setState({
                    renderStart: new Date().getTime(),
                    renderImages: !renderImages,
                    renderSvgs: !svgRender
                }, () => {
                    this.setState({
                        renderTime: new Date().getTime() - this.state.renderStart
                    }, this.loopSwap)
                })
            }, 2000);
        }, 5000)
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{`Render time: ${this.state.renderTime || 0} ms`}</Text>
                    <Text style={styles.headerText}>{`RENDERING PNGS: ${this.state.renderImages}`}</Text>
                    <Text style={styles.headerText}>{`RENDERING SVGS: ${this.state.renderSvgs}`}</Text>
                </View>
                <ScrollView style={styles.container}>

                    <View style={styles.imageWrapper}>
                        {this.state.renderImages && imageIndices.map((index, mapIndex) => <Image key={`image-${mapIndex}`} style={{height: 24, width: 24}}
                                                                                     source={pngs[index]}/>)}
                        {this.state.renderSvgs && imageIndices.map((index, mapIndex) => <Icon key={`image-${mapIndex}`} name={`cube${index}`} height={24}
                                                                                  width={24}/>)}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        marginTop: 50,
        marginBottom: 20,
        backgroundColor: 'gray',
    },
    headerText: {
        color: 'white',
        fontSize: 20
    },
    imageWrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});
