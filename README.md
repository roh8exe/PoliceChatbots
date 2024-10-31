
# Police Chatbot
This project has been meticulously crafted to assist visitors at police stations, offering seamless guidance through legal procedures and essential information. I developed two NLP-based chatbots, COPBOT and COPHELP, designed to provide visitors with foundational legal support and direction on the necessary steps to take following an incident.

To ensure accuracy and relevance, I independently created a comprehensive dataset, grounded in extensive research. The models are implemented in Python, leveraging the open-source platform Hugging Face to enhance their capability. Deployed using a Flask API, the system is architected to continuously evolve by retraining based on user interactions, ensuring it remains responsive and up-to-date with users' needs.


## Demo
I have uploaded a video named  to guide you on how to run the code.
Please look into in carefully:- 
https://drive.google.com/file/d/1-C3-A7mrn14yOe_y2vEDBihaWCY0t30b/view?usp=drive_link

I have also uploaded a pdf named Neural_NiNJAS.pdf to make you understand about the project more better using frontend.




## COPBOT
COPBOT is an NLP-based chatbot powered by Hugging Face, designed to assist visitors at police stations. Visitors can simply describe the issues they are facing, and COPBOT will accurately identify the case type and provide clear guidance on the essential procedures to follow.
The COPBOT code is located in the "policeass" folder. Please refer to the provided video for detailed instructions on running the code. Within this folder, the main code file, app.py, can be deployed using Flask. Additionally, two extensive datasets, case_classification.csv and case_procedures.csv, are included to support case identification and procedural guidance.

Requirements to run the code are:-
1.pandas

2.torch

3.scikit-learn

4.transformers

5.datasets

6.Flask

7.flask_cors
## COPHELP
COPHELP is an NLP-based chatbot powered by Hugging Face, designed to address general queries about Goa's laws and regulations. It provides information on topics ranging from the number of police stations in Goa to the process of filing an RTI. 
The code for COPHELP is in the "faq" folder; please refer to the video for instructions on running it. In this folder, you’ll find qaf.py, the main code file, along with faq.csv, the dataset used to answer queries.
Requirements to run the code are:-

1.pandas

2.torch

3.scikit-learn

4.transformers

5.Flask

6.flask_cors
