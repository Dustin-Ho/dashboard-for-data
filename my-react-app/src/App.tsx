import React, { useState } from 'react';
import './App.css';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface Participant {
  email: string;
  user_id: string;
  role: string;
  years_of_experience: number;
  age: number;
  gender: string;
  vision_impairment: boolean;
}

interface UserInfo {
  user_id: string;
  form_id: string;
  correctness_score: number;
  eye_tracking_data: string;
  responses: string[];
}

interface Response {
  user_id: string;
  associated_forms: string[];
}

interface UserForm {
  user_id: string;
  form_id: string;
  correctness_score: number;
  eye_tracking_data: string;
  responses: string[];
}

interface Creator {
  email: string;
  password: string;
  forms_created: string[];
}

interface Form {
  form_id: string;
  form_name: string;
  date_created: string;
  questions: Question[];
}

interface Question {
  question_text: string;
  question_type: string;
  options: string[];
  correct_answer: string;
  image_url?: string;
}

const sampleParticipants: Participant[] = [
  {
    email: "user1@example.com",
    user_id: "1",
    role: "researcher",
    years_of_experience: 5,
    age: 30,
    gender: "female",
    vision_impairment: false,
  },
  {
    email: "user2@example.com",
    user_id: "2",
    role: "participant",
    years_of_experience: 3,
    age: 22,
    gender: "male",
    vision_impairment: true,
  },
  {
    email: "user3@example.com",
    user_id: "3",
    role: "admin",
    years_of_experience: 10,
    age: 35,
    gender: "non-binary",
    vision_impairment: false,
  },
];

const sampleForms: Form[] = [
  {
    form_id: "form1",
    form_name: "User Experience Survey",
    date_created: "2024-04-01",
    questions: [
      {
        question_text: "How do you rate our website's usability?",
        question_type: "multiple choice",
        options: ["Excellent", "Good", "Fair", "Poor"],
        correct_answer: "Good",
      },
      {
        question_text: "Is the website navigation intuitive?",
        question_type: "yes/no",
        options: ["Yes", "No"],
        correct_answer: "Yes",
      },
    ],
  },
  {
    form_id: "form2",
    form_name: "Product Feedback",
    date_created: "2024-04-02",
    questions: [
      {
        question_text: "How satisfied are you with our product?",
        question_type: "scale",
        options: ["1", "2", "3", "4", "5"],
        correct_answer: "4",
      },
      {
        question_text: "Would you recommend our product to others?",
        question_type: "yes/no",
        options: ["Yes", "No"],
        correct_answer: "Yes",
      },
      {
        question_text: "What feature do you think we should add next?",
        question_type: "open-ended",
        options: [],
        correct_answer: "",
      },
    ],
  },
];

const sampleUserForms: UserForm[] = [
  {
    user_id: "2",
    form_id: "form1",
    correctness_score: 0.8,
    eye_tracking_data: "...",
    responses: ["Good", "Yes"],
  },
  {
    user_id: "2",
    form_id: "form2",
    correctness_score: 0.6,
    eye_tracking_data: "...",
    responses: ["4", "No", "Add more features"],
  },
];

const sampleCreators: Creator[] = [
  {
    email: "creator1@example.com",
    password: "password1",
    forms_created: ["form1", "form2"],
  },
  {
    email: "creator2@example.com",
    password: "password2",
    forms_created: [],
  },
];

interface FormDetailsProps {
  form: Form;
  userForms: UserForm[];
  creator: Creator | undefined;
}

const FormDetails: React.FC<FormDetailsProps> = ({ form, userForms, creator }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Form Details</Typography>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Form Name: {form.form_name}</Typography>
          <Typography>Form ID: {form.form_id}</Typography>
          <Typography>Date Created: {form.date_created}</Typography>
          <Typography>Creator: {creator?.email}</Typography>
          <Typography variant="h6">Questions</Typography>
          {form.questions.map((question, qIndex) => (
            <Card key={qIndex} sx={{ marginBottom: 1 }}>
              <CardContent>
                <Typography>Question: {question.question_text}</Typography>
                <Typography>Type: {question.question_type}</Typography>
                {question.options.length > 0 && (
                  <Typography>Options: {question.options.join(', ')}</Typography>
                )}
                <Typography>Correct Answer: {question.correct_answer}</Typography>
              </CardContent>
            </Card>
          ))}
          <Typography variant="h6">Responses</Typography>
          {userForms.map((userForm, index) => (
            <Card key={index} sx={{ marginBottom: 1 }}>
              <CardContent>
                <Typography>User ID: {userForm.user_id}</Typography>
                <Typography>Correctness Score: {userForm.correctness_score}</Typography>
                <Typography>Eye Tracking Data: {userForm.eye_tracking_data}</Typography>
                <Typography>Responses: {userForm.responses.join(', ')}</Typography>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const FormCard: React.FC<{ form: Form; onClick: () => void }> = ({ form, onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ cursor: 'pointer' }} onClick={onClick}>
        <CardContent>
          <Typography variant="h5">{form.form_name}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

function App() {
  const [participants] = useState<Participant[]>(sampleParticipants);
  const [forms] = useState<Form[]>(sampleForms);
  const [userForms] = useState<UserForm[]>(sampleUserForms);
  const [creators] = useState<Creator[]>(sampleCreators);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  const selectedForm = forms.find((form) => form.form_id === selectedFormId);
  const selectedUserForms = userForms.filter((userForm) => userForm.form_id === selectedFormId);
  const selectedCreator = creators.find((creator) => creator.forms_created.includes(selectedFormId!));

  return (
    <div className="App">
      <Typography variant="h3" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        {forms.map((form) => (
          <FormCard key={form.form_id} form={form} onClick={() => setSelectedFormId(form.form_id)} />
        ))}
      </Grid>
      <hr style={{ margin: '20px 0' }} />
      {selectedForm && (
        <FormDetails form={selectedForm} userForms={selectedUserForms} creator={selectedCreator} />
      )}
    </div>
  );
}

export default App;