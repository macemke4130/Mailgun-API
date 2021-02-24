import * as React from 'react';
import { useEffect, useState } from 'react';

const App = (props: AppProps) => {
	const [subjectLine, setSubjectLine] = useState<string>('');
	const [emailBody, setEmailBody] = useState<string>('');
	const [uEmailOne, setUEmailOne] = useState<string>('');
	const [uEmailTwo, setUEmailTwo] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [detailMessage, setDetailMessage] = useState<string>('');
	const [sendAnother, setSendAnother] = useState<boolean>(false);

	const hEmailOne = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUEmailOne(e.target.value);
		setErrorMessage('');
	}

	const hEmailTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUEmailTwo(e.target.value);
	}

	const hSubjectLine = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubjectLine(e.target.value);
		setErrorMessage('');
	}

	const hEmailBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEmailBody(e.target.value);
		setErrorMessage('');
	}

	const hSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		validateEmail();
	};

	const validateEmail = () => {
		if (uEmailOne != uEmailTwo) {
			setErrorMessage('Email Addresses Do Not Match.');
		} else if (uEmailOne === "" || uEmailTwo === "") {
			setErrorMessage("Please Enter Your Email.")
		} else if (subjectLine === "") {
			setErrorMessage("Please Enter A Subject.")
		} else if (emailBody === "") {
			setErrorMessage("Please Enter A Message.")
		} else {
			sendEmail();
		}
	}

	const sendEmail = async () => {
		const data = {
			from: uEmailOne,
			to: "hard coded in mailgun.ts",
			subject: subjectLine,
			message: emailBody
		}
		const myMethod = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify(data)
		}
		const r = await fetch("/api/email/send", myMethod);
		if (r.ok) {
			setErrorMessage("Message Sent!");
			setDetailMessage("Please check you spam folder as well. Thank you!");
			setSendAnother(true);
		}
	}

	const hSendAnother = () => {
		location.reload();
	}

	useEffect(() => {
		(async () => {
			try {

			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	return (
		<>
			<h2>Contact Us!</h2>
			<form className="d-flex flex-column">
				<input type="email" placeholder="Your Email" value={uEmailOne} onChange={hEmailOne} className="mb-2"></input>
				<input type="email" placeholder="Confirm Your Email" value={uEmailTwo} onChange={hEmailTwo} className="mb-2"></input>
				<p>Recipient Email: edit in mailgun.ts</p>
				<input type="text" placeholder="Subject Line" value={subjectLine} onChange={hSubjectLine} className="mb-2"></input>
				<textarea placeholder="Message" value={emailBody} rows={5} cols={30} onChange={hEmailBody} className="mb-2"></textarea>
				<button className="btn btn-primary" onClick={hSubmit}>Send Email</button>
			</form>
			<div className="d-flex flex-column align-items-center">
				<h2>{errorMessage}</h2>
				<p>{detailMessage}</p>
				<p>{sendAnother && <button className="btn btn-primary" onClick={hSendAnother}>Send Another?</button>}</p>
			</div>
		</>
	);
};

interface AppProps { }

export default App;
