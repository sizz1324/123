<template lang="html">
		<admin-page :schema="schema" :selected="selected" :rows="charge"></admin-page>
</template>

<script> 
	import Vue from "vue";
	import AdminPage from "../../core/moneypage.vue";
	import schema from "./schema";
	import toast from "../../core/toastr";

	import { mapGetters, mapActions } from "vuex";

	import merge from "lodash";

	export default {
		props: {
			isNewModel: true
		},
		components: {
			AdminPage: AdminPage
		},

		computed: {
			...mapGetters("charge", [
				"charge",
				"selected"
			]),
			...mapGetters("session", [
				"me"
			]),
			...mapGetters("counter", [
				"count"
		 ])
		},
		data() {
			return {
				schema
			};
		},

		socket: {

			prefix: "/exchangecharges/",

			events: {
				/**
				 * New moneyflow added
				 * @param  {Object} res Device object
				 */
				created(res) {
					this.created(res.data);
					toast.success(this._("DeviceNameAdded", res), this._("DeviceAdded"));
				},

				/**
				 * Device updated
				 * @param  {Object} res Device object
				 */
				updated(res) {
					this.updated(res.data);
					toast.success(this._("DeviceNameUpdated", res), this._("DeviceUpdated"));
				},

				/**
				 * Device removed
				 * @param  {Object} res Response object
				 */
				removed(res) {
					this.removed(res.data);	
					toast.success(this._("DeviceNameDeleted", res), this._("DeviceDeleted"));
				}
			}
		},		

		methods: {
			...mapActions("charge", [
				"downloadRows",
				"downloadRows2",
				"created",
				"updated",
				"removed",
				"selectRow",
				"clearSelection",
				"saveRow",
				"updateRow",
				"removeRow"
			])
		},
		created() {
			this.downloadRows()
			// this.$confirm('삭제할그냐?', '提示', {
			// 		type: 'warning'
			// 	});
		}
		
	};
</script>