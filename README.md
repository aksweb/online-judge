# Online Judge
### HLD Document
## Tech Stack
### Frontend:
- React
- Tailwind CSS
### Backend:
- Node.js
- Express.js
### Database:
- MongoDB
## Features & Functional Requirements
### Frontend
#### Pages:
1. **Authentication Page**
2. **All Problems Page**
3. **Problem Showing Page**
4. **Submission History**
5. **Solved Problem Details**
6. **User Dashboard**
7. **User Settings**
8. **Admin Settings**
9. **Admin Dashboard**
10. **Problem Setting Page**
11. **User Ranking Page** (based on number of problems solved or overall problem score)

### Backend
#### Auth Routes:
1. **POST** `base_url/signup` - To create a new user/admin.
2. **POST** `base_url/login` – To login upon successful signup.

#### User Accessible Routes:
1. **GET** `base_url/` - To get all problems list.
2. **GET** `base_url/:problem_id` – To get the problem page.
3. **GET** `base_url/:problem_id/:submission_id` - To see the submission history.
4. **GET/PUT** `base_url/:user_id` – User profile settings.
5. **GET** `base_url/:user_id/problems` – To get list of problems solved by the user.

#### Special Admin Accessible Routes:
1. **GET/PUT** `base_url/:admin_id` – Admin profile settings.
2. **GET** `base_url/:admin_id/problems` – Admin can see the created problems.
3. **POST** `base_url/:admin_id/create` – Here admin will create the problem with the test cases.

### Database
#### Schemas:

```code
solvedSchema
    user_id: { type: String, required: true },
    submissions: [
        {
            submission_id: { type: String, required: true },
            problem_id: { type: String, required: true },
            language: { type: String, required: true },
            code: { type: String, required: true },
            verdict: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ]


userSchema 
    user_id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adminRole: { type: Boolean, default: false }


problemSchema 
    problem_id: { type: String, required: true, unique: true }
    author_id: { type: String, required: true }
    title: { type: String, required: true }
    description: { type: String, required: true }
    testCases: { type: String, required: true } // Path or reference to the test cases file
    outputCases: { type: String, required: true } // Path or reference to the output cases file
    totalSubmissions: { type: Number, default: 0 }
    correctSub: { type: Number, default: 0 }
    wrongSub: { type: Number, default: 0 }


submissionSchema 
    submission_id: { type: String, required: true, unique: true }
    user_id: { type: String, required: true }
    problem_id: { type: String, required: true }
    language: { type: String, required: true }
    code: { type: String, required: true }
    verdict: { type: String, required: true }
    timestamp: { type: Date, default: Date.now }
```

## React Project Structure:

### 1. App.js
- Routes to all pages.

### 2. AuthenticationPage.js
#### Components:
- **LoginForm:** Handles user login.
- **SignupForm:** Handles new user registration.

#### Data Flow:
- After successful login/signup, user data (token, user ID, etc.) is stored in a global state or context.

### 3. AllProblemsPage.js
#### Components:
- **ProblemList:** Fetches and displays a list of all problems.
- **ProblemCard:** Displays a single problem summary.

#### Data Flow:
- Fetches data from `base_url/` and displays it.
- Clicking on a problem card navigates to the Problem Showing Page with the problem ID.

### 4. ProblemPage.js
#### Components:
- **ProblemDetail:** Displays the problem description.
- **CodeEditor:** Code editor component with language selection.
- **RunButton:** Button to run the code.
- **SubmitButton:** Button to submit the code.

#### Data Flow:
- Fetches problem details from `base_url/:problem_id`.
- Submissions are sent to the server, and responses are handled to show results.

### 5. SubmissionHistoryPage.js
#### Components:
- **SubmissionList:** Fetches and displays a list of submissions.
- **SubmissionCard:** Displays a single submission summary.

#### Data Flow:
- Fetches data from `base_url/:problem_id/:submission_id`.
- Clicking on a submission card navigates to the Solved Problem Details page.

### 6. SolvedProblemDetailPage.js
#### Components:
- **SubmissionDetail:** Displays details of a specific submission.

#### Data Flow:
- Fetches data from `base_url/:problem_id/:submission_id`.

### 7. UserDashboardPage.js
#### Components:
- **UserProfile:** Displays user profile information.
- **UserStats:** Displays user-specific statistics (e.g., problems solved).
- **UserProblemList:** Displays a list of problems solved by the user.

#### Data Flow:
- Fetches data from `base_url/:user_id` and `base_url/:user_id/problems`.

### 8. UserSettingsPage.js
#### Components:
- **UserSettingsForm:** Form to update user settings.

#### Data Flow:
- Fetches and updates data at `base_url/:user_id`.

### 9. AdminSettingsPage.js
#### Components:
- **AdminSettingsForm:** Form to update admin settings.

#### Data Flow:
- Fetches and updates data at `base_url/:admin_id`.


### 10. AdminDashboardPage.js
#### Components:
- **AdminProfile:** Displays admin profile information.
- **AdminStats:** Displays admin-specific statistics.
- **AdminProblemList:** Displays a list of problems created by the admin.

#### Data Flow:
- Fetches data from `base_url/:admin_id` and `base_url/:admin_id/problems`.


### 11. ProblemSettingPage.js
#### Components:
- **ProblemForm:** Form to create or update a problem.

#### Data Flow:
- Admins create or update problems via `base_url/:admin_id/create`.

### 12. UserRankingPage.js
#### Components:
- **RankingList:** Displays a list of users ranked by problems solved or score.
- **RankingCard:** Displays a single user's rank and stats.

#### Data Flow:
- Fetches and displays user rankings.
