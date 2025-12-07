import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

export default function App() {
  const [recordings, setRecordings] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await fetch("https://xeno-canto.org/api/3/recordings?query=cnt:guatemala&key=92088cf499adb9ccc4f701069d0a5fdeaedc39ba");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const recordingNames = data.recordings.map((rec: any) => rec.en);
        setRecordings(recordingNames);
      }
      catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
      finally {
        setLoading(false);
      }
    };
    fetchRecordings();
  }, []);

  return (
    // Pagina para mostrar las imagenes de los pajaros
    <View style={styles.container}>
      <Text style={styles.title}>Bird Recordings from Guatemala</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      {!loading && !error && (
        <FlatList
          data={recordings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>
          
        }
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  list: { marginTop: 10 },
  item: { paddingVertical: 5, borderBottomWidth: 1, borderColor: "#ddd" },
});
