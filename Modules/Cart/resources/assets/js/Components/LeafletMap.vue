<template>
    <div id="map" ref="mapEl" class="mt-2" style="height: 300px;width: 300px;z-index: 1"></div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconUrl,
    shadowUrl: iconShadow
})
const props = defineProps({
    lat: Number,
    lng: Number
})

const mapEl = ref(null)
let map = null
let marker = null

onMounted(() => {
    // init map
    map = L.map(mapEl.value).setView(
        [props.lat || 24.7136, props.lng || 46.6753],
        13
    )

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map)

    // marker initial
    if (props.lat && props.lng) {
        marker = L.marker([props.lat, props.lng]).addTo(map)
    }
})

watch(
    () => [props.lat, props.lng],
    ([lat, lng]) => {
        if (!lat || !lng || !map) return

        map.setView([lat, lng], 15)

        if (marker) {
            map.removeLayer(marker)
        }

        marker = L.marker([lat, lng]).addTo(map)
    }
)
</script>
