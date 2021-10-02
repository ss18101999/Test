const firebaseConfig = {
    apiKey: "AIzaSyAIIZIuL99m2qouDgGVrpgPrvlTJPBoaGg",
    authDomain: "corona-virus-project-30cb0.firebaseapp.com",
    databaseURL: "https://corona-virus-project-30cb0-default-rtdb.firebaseio.com",
    projectId: "corona-virus-project-30cb0",
    storageBucket: "corona-virus-project-30cb0.appspot.com",
    messagingSenderId: "638892982764",
    appId: "1:638892982764:web:a396af68747aca3eaa40c9"
  };

  firebase.initializeApp(firebaseConfig)

  var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit',submitForm);

  function submitForm(e){
      e.preventDefault();
      var state=getInputVal('state')
      console.log("#######################"+state)
      readState(state.toLowerCase())
      var fname=getInputVal('firstname');
      var lname=getInputVal('lastname');
      var mobile=getInputVal('mobile');
      var profession=getInputVal('profession');
      var dateofbirth=getInputVal('dateofbirth');
      var email=getInputVal('email');
      var symptomsList=getSelectedCheckboxValues('symptoms')
      var selectedOption = document.querySelector(`input[name="option"]:checked`).value;
      var name=fname+" "+lname
      saveData(name,email,mobile,profession,dateofbirth,selectedOption,symptomsList,state);
  }
  function saveData(name,email,mobile,profession,dateofbirth,selectedOption,symptomsList,state){
        var user={
            name,
            email,
            mobile,
            profession,
            dateofbirth,
            selectedOption,
            symptomsList,
            state
        }
        UserInputsRef.push(user)
  }
  function getSelectedCheckboxValues(name){
      const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
      var values=[]
      checkboxes.forEach((checkbox)=>{
          values.push(checkbox.value);
      });
      return values
  }
  function readState(state){
      var centers;
      var ref=firebase.database().ref(state);
      ref.on('value',(data)=>{
            centers=data.val()
            document.getElementById('result').innerHTML="<br>"+centers.toUpperCase();
      })
  }
  function getInputVal(id){
      return document.getElementById(id).value;
  }