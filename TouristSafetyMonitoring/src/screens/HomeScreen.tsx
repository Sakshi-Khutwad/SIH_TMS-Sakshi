// At the top of your HomeScreen.tsx file, add these imports:
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialIcons from "@react-native-vector-icons/material-icons";

// import components
import LiveMap from '../components/LiveMap';

const HomeScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>

      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileIcon}>
            <View style={styles.profileCircle} />
          </TouchableOpacity>
        </View>

        <View style={styles.headingContainer}>
          <Text style={styles.headerTitle}>Welcome Traveller</Text>
        </View>

        {/* Safety Status Card */}
        <View style={styles.safetyCard}>
          <View style={styles.safetyHeader}>
            <View style={styles.checkIcon}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <View style={styles.safetyInfo}>
              <Text style={styles.safetyTitle}>Safety Status</Text>
              <Text style={styles.safetySubtitle}>Safe Zone</Text>
            </View>
            <View style={styles.safetyScore}>
              <Text style={styles.scoreText}>95%</Text>
              <Text style={styles.scoreLabel}>Safety Score</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.safetyDescription}>
            Current area is considered safe for tourists
          </Text>
        </View>

        {/* Live Area Map */}
        <View style={styles.mapSection}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Live Area Map</Text>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>
          <Text style={styles.mapSubtitle}>
            Interactive safety zones and points of interest
          </Text>

          <View style={styles.mapContainer}>
            <LiveMap />
          </View>

          {/* Map Legend */}
          <View style={styles.mapLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendIcon, { backgroundColor: '#10B981', shadowColor: '#10B981', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }]} />
              <Text style={styles.legendText}>Safe Zone</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendIcon, { backgroundColor: '#EF4444', shadowColor: '#EF4444', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }]} />
              <Text style={styles.legendText}>Danger Zone</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendIcon, { backgroundColor: '#9CA3AF', shadowColor: '#9CA3AF', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }]} />
              <Text style={styles.legendText}>Restricted</Text>
            </View>
          </View>
        </View>

        {/* Local Updates Section */}
        <View style={styles.localSection}>
          <View style={styles.localHeader}>
            <Text style={styles.localTitle}>Local Updates</Text>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>
          <Text style={styles.localSubtitle}>
            Stay updated with local developments
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}

      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <TouchableOpacity style={styles.navItem}>
              <MaterialIcons name="groups" size={30} color="#c9ced7ff" />
          </TouchableOpacity>
          <Text style={styles.navText}>Groups</Text>
        </View>

      <View style={styles.navItem}>
          <TouchableOpacity style={styles.emergencyButton}>
              <MaterialIcons name="call" size={30} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.emergencyLabel}>SOS</Text>
        </View>

        <View style={styles.navItem}>
          <TouchableOpacity style={styles.navItem}>
              <MaterialIcons name="calendar-today" size={30} color="#c9ced7ff" />
          </TouchableOpacity>
          <Text style={styles.navText}>Plans</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

// Add these styles to your existing StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    // paddingBottom: 5,
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  menuIcon: {
    width: 18,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: '#1F2937',
    borderRadius: 2,
  },
  headerTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 22,
    color: '#1F2937',
  },
  profileIcon: {
    width: 34,
    height: 34,
  },
  profileCircle: {
    width: 36,
    height: 36,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
  },
  safetyCard: {
    backgroundColor: '#e6f7f1ff',
    borderWidth: 0.6,
    borderColor: '#b1f1daff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#11eb9fff',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#10B981',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  safetyInfo: {
    flex: 1,
  },
  safetyTitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    // fontWeight: '600',
    color: '#1F2937',
  },
  safetySubtitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: '#10B981',
    marginTop: 2,
  },
  safetyScore: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#10B981',
  },
  scoreLabel: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 12,
  },
  progressFill: {
    height: 6,
    width: '75%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  safetyDescription: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  mapSection: {
    margin: 20,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mapTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: '#EF4444',
    backgroundColor: '#fae6e6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    shadowColor: '#EF4444',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    backgroundColor: '#EF4444',
    borderRadius: 3,
    marginRight: 6,
  },
  liveText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
  },
  mapSubtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    marginBottom: 16,
  },
  mapLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  localSection: {
    margin: 20,
  },
  localHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  localTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  localSubtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 80,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    width: '70%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    borderRadius: 6,
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  groupsIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  navText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 12,
    color: '#6B7280',
  },
  emergencyButton: {
    borderRadius: 70,
    alignItems: 'center',
    backgroundColor: '#f86565ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#f86565ff',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyIcon: {
    marginBottom: 4,
  },
  emergencyText: {
    fontSize: 20,
  },
  emergencyLabel: {
    fontFamily: 'Outfit-Bold',
    fontSize: 12,
    color: '#f86565ff',
    marginTop: 4,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
});

export default HomeScreen;