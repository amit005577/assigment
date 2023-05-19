import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({navigation, route}) => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const {name,username,email,id}=route.params||{}

  console.log("show data",name,username,email,id);
  console.log("show route",route)

  useEffect(() => {
    if(data.length==0){
        logJSONData();
    }
    if( name!=null){
        
        data.unshift({name,username,email,id})
        setdata(data)
        route.params.name =null
    }
  }, [isFocused]);

  async function logJSONData() {
    setLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const jsonData = await response.json();
    if (jsonData !== null) {
      setdata(jsonData);
    }
    setLoading(false);
    console.log(jsonData);
  }

  const renderitem = ({item}) => {
    return (
      <View style={styles.uiContainer}>
        <Text style={styles.listText}>Name: {item.name}</Text>
        <Text style={styles.listText}>userName: {item.username}</Text>
        <Text style={styles.listText}>Email:{item.email}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('adduser')}
        style={styles.btnContainer}>
        <Text style={styles.userText}>Add user</Text>
      </TouchableOpacity>
      {loading ? <ActivityIndicator size={'small'} /> : null}
      
      <FlatList
        data={data ? data : []}
        keyExtractor={item => item.id}
        renderItem={renderitem}
        ListEmptyComponent={!data && <ActivityIndicator size={'small'} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,marginBottom:20
  },
  btnContainer: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 20,
  },
  userText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  uiContainer: {
    marginTop: 10,
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 15,
  },
  listText: {
    color: 'black',
    padding: 5,
  },
});
