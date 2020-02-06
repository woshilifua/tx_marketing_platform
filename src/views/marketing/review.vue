<template>
  <Detail :status="'review'" />
</template>

<script>
import Detail from './components/Detail'

export default {
  name: 'EditForm',
  components: { Detail }
}
</script>
