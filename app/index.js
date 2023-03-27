import { useState } from "react";
import { SafeAreaView, Text, ScrollView, View } from "react-native";

// components
import { Nearbyjobs, Popularjobs, Welcome } from "../components";
import { COLORS, SIZES } from "../constants";

import useFetch from "../hook/useFetch"
export default function Home({navigation}) {
  const searchItem = () => {
    navigation.push("home");
  }

  const [searchTerm,setSearchTerm] = useState("");

  const { data, loading, error } = useFetch("search", {
    query: "developer",
    num_pages: "1",
  });

  return (
    <SafeAreaView style={{ backgroundColor:COLORS.lightWhite,flex:1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome route={navigation} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleClick={() => {
            if(searchTerm){
              navigation.navigate('jobsearch',searchTerm)
            }
          }}/>
          <Popularjobs route={navigation} data={data} loading={loading} error={error}/>
          <Nearbyjobs route={navigation}  data={data} loading={loading} error={error}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
