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

import styles from "./nearbyjobs.style";
import useFetch from "../../../hook/useFetchHook";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
const Nearbyjobs = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, error, refetch } = useFetch("search", {
    query: "React developer",
    num_pages: "1",
  });

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
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
            data?.map((job) => (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={handleCardPress}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Nearbyjobs;
