<template>
  <div class="task-item" :class="{ done: task.done }">
    <img v-if="task.img_url" :src="task.img_url" class="task-thumbnail" alt="Imagem da tarefa" />
    <label class="task-label">
      <input type="checkbox" :checked="task.done" @change="$emit('toggle', task.id)" />
      <span class="task-title">{{ task.title }}</span>
    </label>
    <button
      v-if="task.latitude != null && task.longitude != null"
      type="button"
      class="task-location-toggle"
      @click="showLocation = !showLocation"
    >
      {{ showLocation ? '🗺️ Fechar mapa' : '📍 Ver localização' }}
    </button>
    <TaskLocationMap
      v-if="task.latitude != null && task.longitude != null && showLocation"
      :location="taskLocation"
    />
    <div class="task-actions">
      <button class="task-edit" @click="$emit('edit', task)">Editar</button>
      <button
        v-if="task.latitude != null && task.longitude != null"
        class="task-remove-location"
        @click="$emit('remove-location', task.id)"
      >
        Remover localização
      </button>
      <button class="task-remove" @click="$emit('remove', task.id)">Remover</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import TaskLocationMap from "./TaskLocationMap.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const showLocation = ref(false);

const taskLocation = computed(() => ({
  latitude: props.task.latitude,
  longitude: props.task.longitude,
  accuracy: props.task.geolocation_accuracy,
  label: props.task.location_label,
}));

defineEmits(["toggle", "remove", "edit", "remove-location"]);
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s;
  gap: 10px;
}

.task-thumbnail {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #eee;
  flex-shrink: 0;
}

.task-item.done {
  opacity: 0.6;
}

.task-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex: 1;
}

.task-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #4a90d9;
}

.task-title {
  font-size: 1rem;
}

.task-item.done .task-title {
  text-decoration: line-through;
  color: #999;
}

.task-remove {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 4px 8px;
}

.task-remove:hover {
  text-decoration: underline;
}

.task-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}

.task-location-toggle {
  background: none;
  border: none;
  color: #287a45;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 4px 8px;
  flex-basis: 100%;
}

.task-location-toggle:hover {
  text-decoration: underline;
}

.location-indicator {
  color: #287a45;
  font-size: 0.75rem;
  white-space: nowrap;
}

.task-location-map {
  flex: 0 0 100%;
}

.task-edit {
  background: none;
  border: none;
  color: #4a90d9;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 4px 8px;
}

.task-edit:hover {
  text-decoration: underline;
}

.task-remove-location {
  background: none;
  border: none;
  color: #f39c12;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 4px 8px;
}

.task-remove-location:hover {
  text-decoration: underline;
}
</style>
