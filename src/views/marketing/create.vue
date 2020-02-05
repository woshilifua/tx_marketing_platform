<template>
  <Detail :status="'edit'" />
</template>

<script>
import Detail from './components/Detail'

export default {
  name: 'CreateActivity',
  components: { Detail }
}
</script>
