<template lang="pug">
	.container
		h3.title {{ schema.title }}

		.flex.align-center.justify-space-around
			.left(v-if="enabledNew")
				button.button.is-primary(@click="newModel")
					i.icon.fa.fa-plus 차지 익스체인지 
					| {{ schema.resources.addCaption || _("Add") }}
			.right {{ _("SelectedOfAll", { selected: selected.length, all: rows.length } ) }}
		.form(v-if="model")
			vue-form-generator(:schema='schema.form', :model='model', :options='options', :multiple="selected.length > 1", ref="form", :is-new-model="isNewModel")

			.errors.text-center
				div.alert.alert-danger(v-for="(item, index) in validationErrors", :key="index") {{ item.field.label }}: 
					strong {{ item.error }}

			.buttons.flex.justify-space-around
				button.button.primary(@click="saveModel")  
					i.icon.fa.fa-save 
					| {{  _("Save디폴어드민") }}
				button.button.outline(@click="cloneModel" )
					i.icon.fa.fa-copy 
					| {{ schema.resources.cloneCaption || _("Clone") }}
				button.button.danger(@click="deleteModel")
					i.icon.fa.fa-trash 
					| {{ schema.resources.deleteCaption || _("Delete") }}
				button.button.primary(@click="closemodel")
					i.icon.fa.fa-close 
					| {{  _("닫기") }}
				button.button.primary(@click="this.$parent.downloadRows2")
					i.icon.fa.fa-close 
					| {{  _("부모호출") }}
					
		data-table(:schema="schema.table", :rows="rows", :order="order", :search="search", :selected="selected", :select="select", :select-all="selectAll")
 
		div
			image-modal(:visible='visible', @close='close', transition='roll')
				p.image.is-4by3
				img(src='http://placehold.it/1280x960')
		.tile.is-parent.is-4
			article.tile.is-child.box
				h1.title Image
				a.button.is-primary.is-large.modal-button(@click='openModalImage') Launch image modal
 


</template>

<script>
	import Vue from "vue";
	import { schema as schemaUtils } from "vue-form-generator";
	import DataTable from "./dataTable.vue";

	import { each, find, cloneDeep, isFunction } from "lodash";

	import { mapGetters, mapActions } from "vuex";

	import { Modal, ImageModal, CardModal } from 'vue-bulma-modal'

	const ImageModalComponent = Vue.extend(ImageModal) 

	const openImageModal = (propsData = {
	visible: true
	}) => {
	return new ImageModalComponent({
		el: document.createElement('div'),
		propsData
	})
	}

	export default {

		components: {
			DataTable,
			Modal,
			ImageModal,
			CardModal
		},

		props: [
			"schema",
			"selected",
			"rows",
			"visible"

			
		],

		data() {
			return {
				order: {
					field: "createdAt",
					direction: 1
				},

				model: null,
				isNewModel: false,
				showModal: true,
				cardModal: null,
				imageModal: null
			};
		},

		computed: {
			...mapGetters("session", {
				search: "searchText"
			}),

			options() 		{ return this.schema.options || {};	},

			enabledNew() 	{ return (this.options.enableNewButton !== false); },
			enabledSave() 	{ return (this.model && this.options.enabledSaveButton !== false); },
			enabledClone() 	{ return (this.model && !this.isNewModel && this.options.enableDeleteButton !== false); },
			enabledDelete() { return (this.model && !this.isNewModel && this.options.enableDeleteButton !== false); },

			validationErrors() {
				if (this.$refs.form && this.$refs.form.errors) 
					return this.$refs.form.errors;

				return [];
			}
		},	

		watch: {
			selected() {
				if (!this.isNewModel)
					this.generateModel();
			}

			/*
			model: {
				handler: function(newVal, oldVal) {
					if (newVal === oldVal) // call only if a property changed, not the model
						console.log("Model property changed!");
				},
				deep: true
			}*/
		},

		methods: { 
			select(event, row, add) {
				this.isNewModel = false;
				
				if (this.schema.table.multiSelect === true && (add || (event && event.ctrlKey))) {
					this.$parent.selectRow(row, true);
				} else {
					this.$parent.selectRow(row, false);
				}
			},

			selectAll(event) {
				this.isNewModel = false;

				let filter = Vue.filter("filterBy");
				let filteredRows = filter(this.rows, this.search);

				if (this.selected.length < filteredRows.length) {
					// Select all
					this.$parent.selectRow(filteredRows, false);
				} else {
					// Unselect all 
					this.$parent.clearSelection();
				}
			},	

			generateModel() {
				if (this.selected.length == 1) {
					this.model = cloneDeep(this.selected[0]);
				}
				else if (this.selected.length > 1) {
					this.model = schemaUtils.mergeMultiObjectFields(this.schema.form, this.selected);
				}
				else
					this.model = null;
			},

			newModel() {
				console.log("Create new 모델...");

				this.$parent.clearSelection();

				let newRow = schemaUtils.createDefaultObject(this.schema.form);
				this.isNewModel = true;
				this.model = newRow;

				this.$nextTick(() => {
					let el = document.querySelector("div.form input:nth-child(1):not([readonly]):not(:disabled)");
					console.log('로그el:', el);
					if (el)
						el.focus();
				});
			},	
			closemodel() {  
				// this.isNewModel = false;
				this.model = false; 
			},	

			cloneModel() {
				console.log("Clone model...");
				let baseModel = this.model;
				this.$parent.clearSelection();

				let newRow = cloneDeep(baseModel);
				newRow.id = null;
				newRow.code = null;
				this.isNewModel = true;
				this.model = newRow;
			},

			saveModel() {
				this.$confirm('삭제할그냐?', 'ok', {
					type: 'warning'
				}).then(() => {
					if (this.options.validateBeforeSave === false || this.validate()) {

						if (this.isNewModel)
							this.$parent.saveRow(this.model);
						else
							this.$parent.updateRow(this.model);

					} else {
						// Validation error
					}
				}).catch(() => {

				});


				
			},

			deleteModel() {
				if (this.selected.length > 0) {
					each(this.selected, (row) => this.$parent.removeRow(row) );
					this.$parent.clearSelection();
				}
			},

			validate()	{
				let res = this.$refs.form.validate();

				if (this.schema.events && isFunction(this.schema.events.onValidated)) {
					this.schema.events.onValidated(this.model, this.$refs.form.errors, this.schema);
				}

				if (!res) {
					// Set focus to first input with error
					this.$nextTick(() => {
						let el = document.querySelector("div.form tr.error input:nth-child(1)");
						if (el)
							el.focus();
					});
				}

				return res;	
			},

			openModalImage () {
				const imageModal = this.imageModal || (this.imageModal = openImageModal())
				imageModal.$children[0].active()
			},
		
			close () {
			this.$emit('close')
			} 

		},

		created() { 
			this.newModel();
		} 
				
	};

</script>

<style lang="scss" scoped>
	@import "../../scss/common/mixins";

	.container {
		padding: 1rem;
	}

	.form {
		margin: 1rem 0;

		@include bgTranslucentDark(0.2);
		border-radius: 8px;

		.buttons {
			max-width: 400px;
			padding: 0.5em;
		}

	}
</style>
