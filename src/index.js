import '../css/bootstrap.css'
import '../styles.scss';



const onUserSubmit = (e) => {
    e.preventDefault();
    setBtnVisability(true);
    const {name, email, tel} = getValues();
    try {
        sendMail(name, email, tel).then(() => {
            setBtnVisability(false);
            alert('תודה רבה, ניצור עימך קשר בהקדם');
            cleanFields();
        }, (e) => {
            setBtnVisability(false);
            alert('there is slight problem with our servers please contact us in phone');
        });
    } catch (e) {
        console.log(e);
    }


};

const cleanFields = () => {
    const {name, email, tel} = getFields();
    name.value = '';
    email.value = '';
    tel.value = '';
};

const getValues = () => {
    const {name, email, tel} = getFields();
    return {
        name: getValue(name),
        email: getValue(email),
        tel: getValue(tel)
    };
};

const getFields = () => ( {
    name: document.getElementById(getFormControlId('name')),
    email: document.getElementById(getFormControlId('email')),
    tel: document.getElementById(getFormControlId('tel'))
});

const setBtnVisability = (isNotVisable) => {
    const element = document.getElementsByClassName('sendEmail-btn')[0];
    if (isNotVisable)
        element.classList.add('unvisbale');
    else
        element.classList.remove('unvisbale');
};

const getValue = (node) => node.value || '';

const sendMail = (name, email, tel) => emailjs.send("default_service", "template_prsJ61SS", {
    name,
    email,
    tel
});

const getFormControlId = (name) => `reg_${name}`;

const init = () => {
    emailjs.init("user_RacWxnjJoULZLG3WUk81z");
    document.getElementsByClassName('sendEmail-btn')[0].addEventListener('click', onUserSubmit)
};

init();