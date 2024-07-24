// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [heroes, setHeroes] = useState('');
  const [villains, setVillains] = useState('');
  const [plot, setPlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');

  const fetchStory = async () => {
    setLoading(true);
    setStory('');

    try {
      const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
        messages: [
          {
            role: 'system',
            content: 'You are a creative assistant that crafts fairy tales based on the given characters and plot.'
          },
          {
            role: 'user',
            content: `Create a fairy tale with the following details:
                     Heroes: ${heroes}
                     Villains: ${villains}
                     Plot: ${plot}`
          }
        ],
        model: 'gpt-4o'
      });

      const { data } = response;
      setStory(data.response);
    } catch (error) {
      console.error('Error fetching the story:', error);
      setStory('Sorry, there was a problem generating your story.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Fairy Tale Generator</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Heroes:</Text>
          <TextInput
            style={styles.input}
            value={heroes}
            onChangeText={setHeroes}
            placeholder="Enter heroes (e.g., brave knight, cunning fox)"
          />
          <Text style={styles.label}>Villains:</Text>
          <TextInput
            style={styles.input}
            value={villains}
            onChangeText={setVillains}
            placeholder="Enter villains (e.g., evil witch, greedy dragon)"
          />
          <Text style={styles.label}>Plot:</Text>
          <TextInput
            style={styles.input}
            value={plot}
            onChangeText={setPlot}
            placeholder="Enter plot (e.g., rescue the princess, find the treasure)"
          />
        </View>
        <Button title="Generate Fairy Tale" onPress={fetchStory} />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <View style={styles.storyContainer}>
            <Text style={styles.storyText}>{story}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  loader: {
    marginTop: 20,
  },
  storyContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
  },
});