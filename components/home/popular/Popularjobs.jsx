import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

import styles from "./popularjobs.style";
import useFetch from "../../../hook/useFetch";
const Popularjobs = ({ route }) => {
  const { data, error, loading, refetch } = useFetch("search", {
    query: "React developer",
    page: "1",
  });
  const [refreshing, setRefreshing] = useState(false);

  const handleCardPress = (item) => {
    route.navigate("jobdetail", item);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.cardsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <PopularJobCard item={item} handleCardPress={handleCardPress} />
              )}
              keyExtractor={(item) => item?.job_id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Popularjobs;
