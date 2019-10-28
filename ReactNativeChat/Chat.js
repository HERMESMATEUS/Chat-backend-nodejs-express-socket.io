import React, { Component } from "react";
import { TextInput, TouchableOpacity, StyleSheet, ScrollView, Text, View } from "react-native";
import io from "socket.io-client";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.socket = io("http://192.168.1.195:3000");
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
      setTimeout(() => {
        this.dateList.scrollToEnd();
      }, 200)
    });
  }

  sendMessage() {
    this.socket.emit("chat message", { name: this.props.name, Message: this.state.chatMessage });
    this.setState({ chatMessage: "" });
    setTimeout(() => {
      this.dateList.scrollToEnd();
    }, 200)
  }

  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage, key) => (
      chatMessage.name == this.props.name ?
        <View style={{ margin: 5, maxWidth: '60%', padding: 20, alignSelf: 'flex-end', borderRadius: 10, borderWidth: 0.3, borderColor: 'grey', backgroundColor: '#3CA7E9' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }} key={key}>{chatMessage.Message}</Text>
        </View>
        : <View style={{ margin: 5, maxWidth: '60%', padding: 20, alignSelf: 'flex-start', borderRadius: 10, borderWidth: 0.3, borderColor: 'grey', backgroundColor: '#3CA7E9' }}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }} key={key}>{chatMessage.name}</Text>
          <Text style={{ fontSize: 15, color: 'white' }} key={key}>{chatMessage.Message}</Text>
        </View>
    ));

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, margin: 10, borderBottomWidth: 0.3 }}>
          <ScrollView
            ref={ref => this.dateList = ref}
          >
            {chatMessages}
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', height: 50, padding: 5, alignItems: 'center', justifyContent: 'space-between' }}>
          <TextInput
            style={{ flex: 1, borderRadius: 10, borderWidth: 0.3, borderColor: 'grey' }}
            autoCorrect={false}
            value={this.state.chatMessage}
            onChangeText={chatMessage => {
              this.setState({ chatMessage });
            }}
          />
          <TouchableOpacity
            style={{ backgroundColor: '#3CA7E9', justifyContent: 'center', alignItems: 'center', height: 50, width: 60, borderRadius: 10, borderWidth: 0.3, borderColor: 'grey' }}
            onPress={() => this.sendMessage()} >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
    justifyContent: 'space-between'
  }
});
