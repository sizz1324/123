<!--<template lang="pug">
	.container
		h2.title {{ "Demo" | i18n }}

		h3 {{ count }}
		button.button.success(@click="inc") 
			span.icon
				i.fa.fa-arrow-up 
			span {{ "Increment" | i18n }}
		br
		br
		button.button.warning(@click="dec") 
			span
				i.fa.fa-arrow-up  
			span {{ "Decrement" | i18n }}

</template>-->
<template>
	<div>
		<image-modal :visible="true" transition="roll">
			<p class="image is-4by3">
				<img src="http://placehold.it/1280x960">
			</p>
		</image-modal>
		<card-modal :visible="true" :title="title" transition="zoom">
			<div class="content has-text-centered">
				<img :src="src" height="120" alt="Vue Admin">
			</div>
		</card-modal>
	</div>
</template>


<script>
import { Modal, ImageModal, CardModal } from 'vue-bulma-modal'
import {
	mapActions,
	mapGetters
} from "vuex";

import Service from "../../core/service";

export default {

	components: {
		Modal,
		ImageModal,
		CardModal
	},
	/**
	 * Computed getters
	 */
	computed: {
		...mapGetters("session", [
			"me"
		]),
		...mapGetters("counter", [
			"count"
		])

	},

	/**
	 * Page methods
	 */
	methods: {
		/**
		 * Actions from store
		 */
		...mapActions("counter", [
			"getValue",
			"increment",
			"decrement",
			"changedValue"
		]),

		/**
		 * Increment counter
		 */
		inc() {
			this.increment();
		},

		/**
		 * Decrement counter
		 */
		dec() {
			this.decrement();
		}
	},

	/**
	 * Socket handlers. Every property is an event handler
	 */
	socket: {

		prefix: "/counter/",

		//namespace: "/counter",

		events: {
			/**
			 * Counter value is changed
			 * @param  {Number} msg Value of counter
			 */
			changed(res) {
				console.log("Counter changed to " + res.data + (res.user ? " by " + res.user.fullName : ""));
				this.changedValue(res.data);
			}
		}
	},

	created() {
		// alert(this);
		this.$service = new Service("counter", this);
		console.log('로그카운터:', this.count);
		console.log('로그카운터session:', this.me);

		// Get the latest value of counter
		this.getValue();
	}

};

</script>

<style lang="scss" scoped>

</style>
