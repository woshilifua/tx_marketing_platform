<template>
  <Detail :is-edit="false" />
</template>

<script>
import Detail from './components/Detail'

export default {
  name: 'CreateActivities',
  components: { Detail }
}
</script>
