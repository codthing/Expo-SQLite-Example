import Database, {
  createTable,
  insert,
  search,
} from "expo-sqlite-query-helper";
import { deleteData } from "expo-sqlite-query-helper/lib/database";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function App() {
  const [dbItems, setDbItems] = useState([]);

  //初始化数据库
  Database("myDatabase.db");
  useEffect(() => {
    (async () => {
      //创建表
      const created = await createTable("user", {
        name: "varchar(50)",
        email: "varchar(100)",
      });
      console.log({ created });

      //插入一行
      const inserted = await insert("user", [
        { name: "张三的爷爷", email: "test@tester.com" },
      ]);
      console.log({ inserted });
      //插入多行
      const insertedMultiple = await insert("user", [
        { name: "张三的爸爸", email: "test@tester.com" },
        { name: "张三", email: "test2@tester.com" },
      ]);
      console.log({ insertedMultiple });
      //搜索特定行
      const searched = await search("user", { name: "tester" });
      console.log({ searched });
      //搜索所有行
      const searchedAll = await search("user");
      console.log({ searchedAll });

      setDbItems({ seachSingle: searched, selectAll: searchedAll })
    })();
  }, []);

  //从表中删除旧数据
  const deleted = () => { deleteData("user");}
  console.log({ deleted })

  return (
    <View style={styles.container}>
      <Text style={styles.h3}>Databse Items</Text>
      <View style={{ padding: 15 }} >
        <Text style={styles.h3}>{JSON.stringify(dbItems)}</Text>
      </View>

      <TouchableOpacity onPress={() => setDbItems(deleted())} style={{ backgroundColor: 'rgba(0,0,0,0.6)', paddingVertical: 12, paddingHorizontal: 22 }}>
        <Text style={{ color: '#FFF' }}>删除user表的数据</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  h3: {
    fontSize: 24
  }
});
