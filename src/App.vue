<template>
  <div>
    <button style="margin-right: 10px" @click="addColumn">add column</button>
    <button @click="addTask">add task</button>
    <input
      style="margin-left: 10px; padding: 10px; border-radius: 5px"
      v-model="search"
      placeholder="search"
    />
    <Container
      orientation="horizontal"
      drag-handle-selector=".column-drag-handle"
      :drop-placeholder="upperDropPlaceholderOptions"
      style="margin-top: 20px"
    >
      <Draggable v-for="(column, colIndex) in scene.children" :key="column.id">
        <div>
          <div class="card-column-header">
            <span class="column-drag-handle">&#x2630; {{ column.name }}</span>

            <button
              style="
                margin-left: 10px;
                font-size: smaller;
                background-color: rgba(254, 98, 77, 0.437);
              "
              @click="deleteColumn(colIndex)"
            >
              Delete &#x2613;
            </button>
          </div>
          <Container
            group-name="col"
            @drop="(e) => onCardDrop(column.id, e)"
            :get-child-payload="getCardPayload(column.id)"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
            class="drop-container"
            :style="scene.children.length > 2 ? 'width:350px' : ''"
          >
            <Draggable
              v-for="card in column.children"
              :key="card.id"
              v-show="card.id"
            >
              <card
                v-show="
                  card.description.includes(search) ||
                  card.title.includes(search)
                "
                @deleteTask="onDeleteTask(column.id, card.id)"
                :title="card.title"
                :description="card.description"
                @dataChange="overwriteTask(card.id, $event)"
              />
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import card from "./components/card.vue";
import { defaultData, defaultTask, defaultColumn } from "./defaultData.js";

export default {
  name: "Cards",
  components: { Container, Draggable, card },
  data() {
    return {
      scene:
        JSON.parse(window?.localStorage?.getItem("to do listTasks")) ||
        defaultData,
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      search: "",
    };
  },
  mounted() {
    const channel = new BroadcastChannel("message-ch");

    channel.addEventListener("message", () => {
      this.scene = JSON.parse(window?.localStorage?.getItem("to do listTasks"));
    });
  },
  methods: {
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        const column = scene.children.filter((p) => p.id === columnId)[0];
        const columnIndex = scene.children.indexOf(column);

        const newColumn = Object.assign({}, column);
        newColumn.children = this.applyDrag(newColumn.children, dropResult);
        scene.children.splice(columnIndex, 1, newColumn);

        window.localStorage.setItem("to do listTasks", JSON.stringify(scene));
        this.scene = scene;
      }
    },

    getCardPayload(columnId) {
      return (index) => {
        return this.scene.children.filter((p) => p.id === columnId)[0].children[
          index
        ];
      };
    },
    setData(event, columnName, taskId) {
      const target = this.scene.children.filter((p) => p.id === columnId);

      return;
    },

    overwriteTask(taskId, { title, description }) {
      for (let i = 0; i < this.scene.children.length; i++) {
        const container = this.scene.children[i];

        for (let j = 0; j < container.children.length; j++) {
          const task = container.children[j];
          if (task.id === taskId) {
            task.title = title;
            task.description = description;
            window.localStorage.setItem(
              "to do listTasks",
              JSON.stringify(this.scene)
            );

            return;
          }
        }
      }
    },
    setInLocal(scene) {
      window.localStorage.setItem("to do listTasks", JSON.stringify(scene));
      const channel = new BroadcastChannel("message-ch");
      channel.postMessage("");
    },
    addColumn() {
      this.scene.children.push({ ...defaultColumn, id: crypto.randomUUID() });
      this.setInLocal(this.scene);
    },
    addTask() {
      this.scene.children[0].children.push({
        ...defaultTask,
        id: crypto.randomUUID(),
      });
      this.setInLocal(this.scene);
    },
    deleteColumn(index) {
      this.scene.children.splice(index, 1);
      this.setInLocal(this.scene);
    },

    onDeleteTask(columnId, taskId) {
      const selectedCol =
        this.scene.children[
          this.scene.children.findIndex((col) => col.id === columnId)
        ];
      selectedCol.children[
        selectedCol.children.findIndex((task) => task.id === taskId)
      ].id = undefined;
      this.setInLocal(this.scene);
    },
  },
};
</script>
<style scoped>
.editable {
  user-select: none;
  outline: none;
  display: flex;
  justify-content: space-between;
}
</style>
