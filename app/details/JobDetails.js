import React from "react";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About","Qualifications","Responsibilites"]
function JobDetails({ navigation, route }) {
  const { job_id } = route.params;
  const { data, loading, error, refetch } = useFetch("job-details", {
    job_id: job_id,
  });
  const [refreshing,setRefreshing] = useState(false);
  const [activeTab,setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch(activeTab){
      case "Qualifications":
        return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A']}/>

      case "About":
        return <JobAbout info={data[0].job_description ?? "No data provided"}/>
      case "Responsibilites":
        return <Specifics title="Responsibilites" points={data[0].job_highlights?.Responsibilites ?? ['N/A']}/>
      default:
        break;
    }
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />
            <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>
    </SafeAreaView>
  );
}

export default JobDetails;
