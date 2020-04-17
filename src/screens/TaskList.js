import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native'

// import Task from '../components/Task'
// import CommonStyles from '../commonStyles'
// import * as Font from 'expo-font'
// import todayImage from '../../assets/imgs/today.jpg'
// import AddTask from './AddTask'

// import {AsyncStorage} from 'react-native';
// import moment from 'moment'
// import 'moment/locale/pt-br'

// import Icon from 'react-native-vector-icons/FontAwesome'

// const initialState = {
//     showDoneTasks: true,
//     showAddTask: false,
//     visibleeTask: [],
//     tasks: [],
// }

export default class TaskList extends Component {
//     //Usar font personalizada no expo = importar import * as Font from 'expo-font'
//     state = {
//         ...initialState,
//         loading: true
//     }
//     async componentDidMount() {
//         await Font.loadAsync({
//           'Lato': require('../../assets/fonts/TravelingTypewriter.ttf'),
//         })
//         this.setState({ loading: false })
//         // isso aqui em baixo é do projeto mesmo
//         const stateString = await AsyncStorage.getItem('tasksState')
//         const state = JSON.parse(stateString) || initialState
//         this.setState(state, this.filterTasks)
//     }
//     //acaba aqui

//     // componentDidMount = () => {
//     //     this.filterTasks()
//     // }

//     toggleFilter = () => {
//         this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
//     }

//     filterTasks = () => {
//         let visibleeTask = null
//         if (this.state.showDoneTasks) {
//             visibleeTask = [...this.state.tasks]
//         } else {
//             const pedding = task => task.doneAt === null 
//             visibleeTask = this.state.tasks.filter(pedding)
//         }

//         this.setState({ visibleeTask })
//         AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
//     }

//     toggleTask = taskId => {
//         const tasks = [...this.state.tasks]
//         tasks.forEach(task => {
//             if(task.id === taskId) {
//                 task.doneAt = task.doneAt ? null : new Date()
//             }
//         })

//         this.setState({ tasks }, this.filterTasks)
//     }

//     addTask = newTask => {
//         if(!newTask.desc || !newTask.desc.trim()){
//             Alert.alert('Dado não cadastrado', 'Descrição não informada')
//             return
//         }

//         const tasks = [...this.state.tasks]
//         tasks.push({
//             id: Math.random(),
//             desc: newTask.desc,
//             estimateAt: newTask.date,
//             doneAt: null,
//         })

//         this.setState({ tasks, showAddTask: false }, this.filterTasks)
//     }

//     deleteTask = id => {
//         const tasks = this.state.tasks.filter(task => task.id != id)
//         this.setState({ tasks }, this.filterTasks)
//     }

        render() {
//         //isso também
//         if (this.state.loading) {
//             return (
//               <View></View>
//             );
//         }
//         //aqui
//         const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
            return (
                <View>
                    <Text>oi</Text>
                </View>
            )
        }
    }   

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     background: {
//         flex: 3,
//     },
//     taskList: {
//         flex: 7,
//     },
//     titleBar: {
//         flex: 1,
//         justifyContent: 'flex-end',
//     },
//     title: {
//         fontFamily: CommonStyles.fontfamily,
//         color: CommonStyles.color.secondary,
//         fontSize: 50,
//         marginLeft: 20,
//         marginBottom: 20,
//     },
//     subtitle: {
//         fontFamily: CommonStyles.fontfamily,
//         color: CommonStyles.color.secondary,
//         fontSize: 20,
//         marginLeft: 20,
//         marginBottom: 30,
//     },
//     iconBar: {
//         flexDirection: 'row',
//         marginHorizontal: 20,
//         justifyContent: 'flex-end',
//         marginTop: Platform.OS === 'ios' ? 40 : 40,
//     },
//     addButton: {
//         position: 'absolute',
//         right: 30,
//         bottom: 30,
//         height: 50,
//         width: 50,
//         borderRadius: 25,
//         backgroundColor: CommonStyles.color.today,
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
// })