/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/database/database.js":
/*!**********************************!*\
  !*** ./src/database/database.js ***!
  \**********************************/
/***/ ((module) => {

eval("/**\n * Database module\n */\nclass Database {\n  /**\n     * @param {string} name Database Name\n     * @param {int} version Database Version\n     */\n  constructor(name, version) {\n    this.name = name;\n    this.version = version;\n    this.indexedDB = {};\n    this.database = indexedDB.open(name, version);\n  }\n  /**\n   * Initialize DB\n   * @param {string} fields Fields of indexedDB instance\n   * @return {Promise} promise\n   */\n  initialize(fields) {\n    return new Promise((resolve, reject) => {\n      this.database.onupgradeneeded = (event) => {\n        const instance = event.target.result;\n        const objectStore = instance.createObjectStore(this.name, {\n          keyPath: 'key',\n          autoIncrement: true,\n        });\n\n        if (typeof fields === 'string') {\n          fields = fields.split(',');\n        }\n        for (const field of fields) objectStore.createIndex(field, field);\n      };\n\n      this.database.onsuccess = (event) => {\n        console.log(`Database ${this.name}: created successfully`);\n        this.indexedDB = this.database.result;\n        resolve(this.indexedDB);\n      };\n      this.database.onerror = function(event) {\n        reject(new Error(`error opening database ${event.target.errorCode}`));\n      };\n    });\n  }\n\n  /**\n   * Save a record to DB\n   * @param {Object} record Application object to be saved\n   * @return {Promise} promise\n   */\n  save(record) {\n    return new Promise((resolve, reject) => {\n      if (typeof record === 'object') {\n        // eslint-disable-next-line max-len\n        const transaction = this.indexedDB.transaction([this.name], 'readwrite');\n        const objectStore = transaction.objectStore(this.name);\n        const request = objectStore.add(record);\n        request.onsuccess = () => {\n          resolve(transaction);\n        };\n        request.onerror = () => {\n          reject(new Error('An object was expected.'));\n        };\n      }\n    });\n  }\n  /**\n   * getCursor\n   * @return {Cursor} Cursor\n   */\n  getCursor() {\n    return new Promise((resolve, reject) => {\n      const transaction = this.indexedDB.transaction([this.name], 'readonly');\n      const objectStore = transaction.objectStore(this.name);\n      const request = objectStore.openCursor();\n      request.onsuccess = (e) => {\n        resolve(request);\n      };\n      request.onerror = () => {\n        reject(new Error('Could not get cursor'));\n      };\n    });\n  }\n  /**\n   * Get Record By Key\n   * @param {int} key\n   * @return {Object} record\n   */\n  getRecordByKey(key) {\n    return new Promise((resolve, reject) => {\n      if (typeof key === 'number') {\n        const transaction = this.indexedDB.transaction([this.name], 'readonly');\n        const objectStore = transaction.objectStore(this.name);\n        const request = objectStore.get(key);\n        request.onsuccess = () => {\n          resolve(request.result);\n        };\n      } else {\n        reject(new Error('Key expected to be a number.'));\n      }\n    });\n  }\n  /**\n   * get all records in db\n   * @return {Promise}\n   */\n  getAllRecords() {\n    return new Promise((resolve, reject) => {\n      const transaction = this.indexedDB.transaction([this.name], 'readonly');\n      const objectStore = transaction.objectStore(this.name);\n      const request = objectStore.openCursor();\n      const data = [];\n      request.onsuccess = (e) => {\n        const cursor = e.target.result;\n        if (cursor) {\n          data.push(cursor.value);\n          cursor.continue();\n        } else {\n          resolve(data);\n        }\n      };\n      request.onerror = () => {\n        reject(new Error('Could not get records'));\n      };\n    });\n  }\n  /**\n   * Updates a record in DB\n   * @param {Object} record\n   * @return {Promise} promise\n   */\n  update(record) {\n    return new Promise((resolve, reject) => {\n      if (typeof record === 'object') {\n        // eslint-disable-next-line max-len\n        const transaction = this.indexedDB.transaction([this.name], 'readwrite');\n        const objectStore = transaction.objectStore(this.name);\n        const request = objectStore.put(record);\n        console.log('Update type', typeof(request));\n        request.onsuccess = () => {\n          resolve(request.result);\n        };\n        request.onerror = () => {\n          reject(new Error('Could not update'));\n        };\n      } else {\n        reject(new Error('An object was expected'));\n      }\n    });\n  }\n\n  /**\n   * Delete Record by Key\n   * @param {int} key\n   * @return {Promise} promise\n   */\n  remove(key) {\n    return new Promise((resolve, reject) => {\n      if (typeof key === 'number') {\n        // eslint-disable-next-line max-len\n        const transaction = this.indexedDB.transaction([this.name], 'readwrite');\n        const objectStore = transaction.objectStore(this.name);\n        const request = objectStore.delete(key);\n        request.onsuccess = () => {\n          resolve(request.result);\n        };\n      } else {\n        reject(new Error('key is not number'));\n      }\n    });\n  }\n}\n\n\nmodule.exports = Database;\n\n\n//# sourceURL=webpack://cse210_group6/./src/database/database.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database/database */ \"./src/database/database.js\");\n/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_database_database__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/**\n@param {LoadDatabase} loadDB Run on page load/refresh\n@listens LoadDatabase\n     */\ndocument.addEventListener('DOMContentLoaded', (loadDB) => {\n  const name = 'Applications';\n  const version = 1;\n  const fields = 'jobID,'+\n  'companyName,'+\n  'jobType,'+\n  'jobRole,'+\n  'doa,'+\n  'applicationStatus,'+\n  'description';\n  let appliedCount;\n  let inProgressCount;\n  let offerCount;\n  let rejectCount;\n  const database = new (_database_database__WEBPACK_IMPORTED_MODULE_0___default())(name, version);\n  database.initialize(fields).then(()=>showAppCards());\n  console.log(database);\n  // save button to save application in database\n  document.getElementById('save').onclick = addApplication;\n  // show form to call function to display form\n  document.getElementById('showForm').onclick = showApplicationForm;\n  // getting the element containing all job cards\n  const appCardContainer = document.querySelector('#app-card-container');\n  /**\n    Add Application Function\n    @param {event} event\n   */\n  function addApplication(event) {\n    event.preventDefault();\n    const jobID = document.getElementById('jobid').value;\n    const companyName = document.getElementById('cname').value;\n    const jobType =\n    findRadioSelectedValue(document.getElementsByName('jobtype'));\n    const jobRole = document.getElementById('jobrole').value;\n    const doa = document.getElementById('doa').value;\n    const applicationStatus = document.getElementById('status').value;\n    const description = document.getElementById('desc').value;\n    // craeting record in db\n    const application = {jobID: jobID,\n      companyName: companyName,\n      jobType: jobType,\n      jobRole: jobRole,\n      doa: doa,\n      applicationStatus: applicationStatus,\n      description: description,\n      lastUpdated: getCurrentDate()};\n    database.save(application)\n        .then((transaction) => {\n          document.getElementById('application-form').reset();\n          transaction.oncomplete = () => {\n            showAppCards();\n            console.log('added');\n          };\n        })\n        .catch((error) => console.log('error', error));\n  }\n\n  /**\n    * Function to fetch and create all cards from db\n    */\n  function showAppCards() {\n    // Leave the div for card container empty\n    while (appCardContainer.firstChild) {\n      appCardContainer.removeChild(appCardContainer.firstChild);\n    }\n    database.getAllRecords().then(\n        (data) => {\n          createAppCards(data);\n          console.log(appliedCount, inProgressCount, offerCount, rejectCount);\n        },\n    ).catch((e) => console.log(e, 'error in fetching all records'));\n  }\n\n  /**\n   * Create app cards for all records in db\n   * @param {Array} data\n   */\n  function createAppCards(data) {\n    if (data!==null && data.length>0) {\n      appliedCount=0;\n      inProgressCount=0;\n      offerCount=0;\n      rejectCount=0;\n      data.forEach(createJobCard);\n    } else {\n      createEmptyAppCard();\n    }\n  }\n  /**\n   * Function to create Empty card in case of no applications\n   * @param {Object} value\n   */\n  function createJobCard(value) {\n    // const {key,\n    //   jobID,\n    //   companyName,\n    //   jobType,\n    //   jobRole,\n    //   doa,\n    //   description,\n    //   applicationStatus} = value;\n    console.log(value);\n\n    const card = document.createElement('div');\n    card.setAttribute('class', 'card mb-3 mx-auto');\n    card.style = 'max-width: 750px;';\n\n    const row = document.createElement('div');\n    row.setAttribute('class', 'row g-0');\n    card.appendChild(row);\n    createJobCardColumnOne(row, value);\n    createJobCardColumnTwo(row, value.applicationStatus);\n    createJobCardColumnThree(row, value.key);\n    switch (value.applicationStatus) {\n      case 'applied':\n        appliedCount++;\n        break;\n      case 'inProgress':\n        inProgressCount++;\n        break;\n      case 'offer':\n        offerCount++;\n        break;\n      case 'reject':\n        rejectCount++;\n        break;\n    }\n    appCardContainer.appendChild(card);\n  }\n\n  /**\n  * Creates a job card with information populated\n  * @param {HTMLElement} parent\n  * @param {Object} value\n  * */\n  function createJobCardColumnOne(parent, value) {\n    const columnOne = document.createElement('div');\n    columnOne.setAttribute('class', 'col-md-8');\n    parent.appendChild(columnOne);\n\n    const bodyOne = document.createElement('div');\n    bodyOne.setAttribute('class', 'card-body');\n    columnOne.appendChild(bodyOne);\n\n    createCompanyNameElement(bodyOne, value.companyName);\n    createJobIDElement(bodyOne, value.jobID);\n    createJobTypeElement(bodyOne, value.jobType);\n    createJobRoleElement(bodyOne, value.jobRole);\n    createDateAppliedElement(bodyOne, value.doa);\n    createDescriptionElement(bodyOne, value.description);\n\n    // createLastUpdatedElement(bodyOne, job)\n  }\n\n  /**\n  * Creates a part of job card with status information\n  * @param {HTMLElement} parent\n  * @param {String} applicationStatus\n  * */\n  function createJobCardColumnTwo(parent, applicationStatus) {\n    const columnTwo = document.createElement('div');\n    columnTwo.setAttribute('class',\n        setStatusBackgroundColor(applicationStatus));\n    parent.appendChild(columnTwo);\n\n    const bodyTwo = document.createElement('div');\n    bodyTwo.setAttribute('class', 'card-body');\n    columnTwo.appendChild(bodyTwo);\n\n    const coloredColumn = document.createElement('div');\n    coloredColumn.setAttribute('class', 'd-flex justify-content-center');\n    bodyTwo.appendChild(coloredColumn);\n\n    const status = document.createElement('h5');\n    status.setAttribute('class', 'text-light');\n    status.innerHTML = applicationStatus;\n    coloredColumn.appendChild(status);\n  }\n\n  /**\n  * Creates a part of job card with edit, delete info\n  * @param {HTMLElement} parent\n  * @param {String} key\n  * */\n  function createJobCardColumnThree(parent, key) {\n    const columnThree = document.createElement('div');\n    columnThree.setAttribute('class', 'col-sm-1 btn-group-vertical btn-block');\n    parent.appendChild(columnThree);\n\n    addJobCardEditButton(columnThree, key);\n    addJobCardDeleteButton(columnThree, key);\n  }\n\n  /**\n * Creates an entry for company title in job card\n * @param {HTMLElement} parent\n * @param {String} cname\n */\n  function createCompanyNameElement(parent, cname) {\n    const cardTitle = document.createElement('h5');\n    cardTitle.innerHTML = cname; // cannot be null - form check added.\n    parent.appendChild(cardTitle);\n  }\n\n  /**\n * Creates an entry for jobType in job card\n * @param {HTMLElement} parent\n * @param {String} jobID\n */\n  function createJobIDElement(parent, jobID) {\n    const jobIDElement = document.createElement('p');\n    jobIDElement.setAttribute('class', 'card-text');\n    parent.appendChild(jobIDElement);\n\n    const mutedTextOne = document.createElement('text');\n    mutedTextOne.setAttribute('class', 'text-muted');\n    mutedTextOne.innerHTML = 'Job ID: ';\n    jobIDElement.appendChild(mutedTextOne);\n\n    const regularTextOne = document.createElement('text');\n    regularTextOne.innerHTML = jobID!==undefined ? jobID : '';\n    jobIDElement.appendChild(regularTextOne);\n  }\n\n  /**\n * Creates an entry for jobType in job card\n * @param {HTMLElement} parent\n * @param {String} jobType\n */\n  function createJobTypeElement(parent, jobType) {\n    const jobTypeElement = document.createElement('p');\n    jobTypeElement.setAttribute('class', 'card-text');\n    parent.appendChild(jobTypeElement);\n\n    const mutedTextOne = document.createElement('text');\n    mutedTextOne.setAttribute('class', 'text-muted');\n    mutedTextOne.innerHTML = 'Job Type: ';\n    jobTypeElement.appendChild(mutedTextOne);\n\n    const regularTextOne = document.createElement('text');\n    regularTextOne.innerHTML = jobType!==undefined ? jobType : '';\n    jobTypeElement.appendChild(regularTextOne);\n  }\n\n  /**\n   * Creates an entry for jobRole in job card\n   * @param {HTMLElement} parent\n   * @param {String} jobRole\n   */\n  function createJobRoleElement(parent, jobRole) {\n    const jobRoleElement = document.createElement('p');\n    jobRoleElement.setAttribute('class', 'card-text');\n    parent.appendChild(jobRoleElement);\n\n    const mutedTextTwo = document.createElement('text');\n    mutedTextTwo.setAttribute('class', 'text-muted');\n    mutedTextTwo.innerHTML = 'Job Role: ';\n    jobRoleElement.appendChild(mutedTextTwo);\n\n    const regularTextTwo = document.createElement('text');\n    regularTextTwo.innerHTML = jobRole!==undefined ? jobRole : '';\n    jobRoleElement.appendChild(regularTextTwo);\n  }\n  /**\n   * Creates an entry for description in job card\n   * @param {HTMLElement} parent\n   * @param {String} desc\n   */\n  function createDescriptionElement(parent, desc) {\n    const descElement = document.createElement('p');\n    descElement.setAttribute('class', 'card-text');\n    parent.appendChild(descElement);\n\n    const mutedTextTwo = document.createElement('text');\n    mutedTextTwo.setAttribute('class', 'text-muted');\n    mutedTextTwo.innerHTML = 'Description: ';\n    descElement.appendChild(mutedTextTwo);\n\n    const regularTextTwo = document.createElement('text');\n    regularTextTwo.innerHTML = desc!==undefined ? desc : '';\n    descElement.appendChild(regularTextTwo);\n  }\n  /**\n * Creates an entry for doa in job card\n * @param {HTMLElement} parent\n * @param {String} doa\n */\n  function createDateAppliedElement(parent, doa) {\n    const dateApplied = document.createElement('p');\n    dateApplied.setAttribute('class', 'card-text');\n    parent.appendChild(dateApplied);\n\n    const mutedTextTwo = document.createElement('text');\n    mutedTextTwo.setAttribute('class', 'text-muted');\n    mutedTextTwo.innerHTML = 'Date Applied: ';\n    dateApplied.appendChild(mutedTextTwo);\n\n    const regularTextTwo = document.createElement('text');\n    regularTextTwo.innerHTML = doa!==undefined ? doa : '';\n    dateApplied.appendChild(regularTextTwo);\n  }\n\n  // TODO: for use later\n  // function createLastUpdatedElement(parent, job) {\n  //   const lastUpdated = document.createElement('p');\n  //   lastUpdated.setAttribute('class', 'card-text');\n  //   const lastUpdatedText = document.createElement('small');\n  //   lastUpdatedText.setAttribute('class', 'text-muted');\n  //   lastUpdatedText.innerHTML = 'Last updated 3 mins ago';\n\n  //   lastUpdated.appendChild(lastUpdatedText);\n  //   parent.appendChild(lastUpdated);\n  // }\n\n  /**\n  * Creates a edit button of job card\n  * @param {HTMLElement} parent\n  *  @param {String} key\n  * */\n  function addJobCardEditButton(parent, key) {\n    const editButton = document.createElement('button');\n    editButton.type = 'button';\n    editButton.setAttribute('class', 'btn btn-light');\n    editButton.setAttribute('id', 'edit-app');\n    parent.appendChild(editButton);\n\n    const buttonText = document.createElement('p');\n    buttonText.setAttribute('class', 'text-info');\n    buttonText.innerHTML = 'edit';\n    editButton.appendChild(buttonText);\n  }\n\n  /**\n  * Creates a delete button of job card\n  * @param {HTMLElement} parent\n  * @param {String} key\n  * */\n  function addJobCardDeleteButton(parent, key) {\n    const deleteButton = document.createElement('button');\n    deleteButton.type = 'button';\n    deleteButton.setAttribute('class', 'btn btn-light');\n    deleteButton.setAttribute('id', 'delete-app');\n    deleteButton.addEventListener('click', function() {\n      deleteApplication(key);\n    });\n    // deleteButton.onclick = deleteApplication(key);\n    parent.appendChild(deleteButton);\n\n    const buttonText = document.createElement('p');\n    buttonText.setAttribute('class', 'text-danger');\n    buttonText.innerHTML = 'del';\n    deleteButton.appendChild(buttonText);\n  }\n\n  /**\n * To set bg color indicating status of application.\n * @param {String} status\n * @return {String}\n */\n  function setStatusBackgroundColor(status) {\n    if (status == 'applied') {\n      return 'col-sm bg-warning';\n    } else if (status == 'inProgress') {\n      return 'col-sm bg-primary';\n    } else if (status == 'offer') {\n      return 'col-sm bg-success';\n    } else if (status == 'reject') {\n      return 'col-sm bg-danger';\n    } else {\n      return 'col-sm bg-muted';\n    }\n  }\n\n  /**\n   * Function to create Empty card in case of no applications\n   */\n  function createEmptyAppCard() {\n    if (!appCardContainer.firstChild) {\n      const text = document.createElement('p');\n      text.textContent = 'No applications to show here!';\n      appCardContainer.appendChild(text);\n    }\n  }\n\n  /**\n    Show Application Form\n    @param {event} event\n   */\n  function showApplicationForm(event) {\n    event.preventDefault();\n    // enable the display of app form\n    console.log('Application Form Has Been Activated');\n    document.getElementById('application-form').style.display = '';\n  }\n\n  /**\n   * find the value selected in Radio button\n   * @param {HTMLElement} elements\n   * @return {string}\n   */\n  function findRadioSelectedValue(elements) {\n    let val = '';\n\n    for (let i = 0; i < elements.length; i++) {\n      if (elements[i].checked) {\n        val = elements[i].value;\n      }\n    }\n    return val;\n  }\n\n  /**\n   * Returns todays date in yyyy-mm-dd format\n   * @return {String} today's date\n   */\n  function getCurrentDate() {\n    let today = new Date();\n    const dd = String(today.getDate()).padStart(2, '0');\n    const mm = String(today.getMonth() + 1).padStart(2, '0');\n    const yyyy = today.getFullYear();\n    today = yyyy + '-' + mm + '-' + dd;\n    return today;\n  }\n\n  /**\n   * Function to succesfully delete the application.\n   * @param {int} key\n   */\n  function deleteApplication(key) {\n    database.remove(key)\n        .then((result) => {\n          showAppCards();\n          console.log(result);\n        })\n        .catch((error) => console.log('error in deleting record!', error));\n  }\n});\n\n\n//# sourceURL=webpack://cse210_group6/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;