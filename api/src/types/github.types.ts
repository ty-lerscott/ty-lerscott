export type GHUser = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
};

export type GHReactions = {
	url: string;
	total_count: number;
	"+1": number;
	"-1": number;
	laugh: number;
	hooray: number;
	confused: number;
	heart: number;
	rocket: number;
	eyes: number;
};

export type GHComment = {
	url: string;
	html_url: string;
	id: number;
	node_id: string;
	user: GHUser;
	position: string | null;
	line: string | null;
	path: string | null;
	commit_id: string;
	created_at: string;
	updated_at: string;
	author_association: string;
	body: string;
	reactions: GHReactions;
};

export type GHRepositoryOwner = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
};

export type GHRepository = {
	id: number;
	node_id: string;
	name: string;
	full_name: string;
	private: boolean;
	owner: GHRepositoryOwner;
	html_url: string;
	description: string | null;
	fork: boolean;
	url: string;
	forks_url: string;
	keys_url: string;
	collaborators_url: string;
	teams_url: string;
	hooks_url: string;
	issue_events_url: string;
	events_url: string;
	assignees_url: string;
	branches_url: string;
	tags_url: string;
	blobs_url: string;
	git_tags_url: string;
	git_refs_url: string;
	trees_url: string;
	statuses_url: string;
	languages_url: string;
	stargazers_url: string;
	contributors_url: string;
	subscribers_url: string;
	subscription_url: string;
	commits_url: string;
	git_commits_url: string;
	comments_url: string;
	issue_comment_url: string;
	contents_url: string;
	compare_url: string;
	merges_url: string;
	archive_url: string;
	downloads_url: string;
	issues_url: string;
	pulls_url: string;
	milestones_url: string;
	notifications_url: string;
	labels_url: string;
	releases_url: string;
	deployments_url: string;
	created_at: string;
	updated_at: string;
	pushed_at: string;
	git_url: string;
	ssh_url: string;
	clone_url: string;
	svn_url: string;
	homepage: string | null;
	size: number;
	stargazers_count: number;
	watchers_count: number;
	language: string;
	has_issues: boolean;
	has_projects: boolean;
	has_downloads: boolean;
	has_wiki: boolean;
	has_pages: boolean;
	has_discussions: boolean;
	forks_count: number;
	mirror_url: string | null;
	archived: boolean;
	disabled: boolean;
	open_issues_count: number;
	license: string | null;
	allow_forking: boolean;
	is_template: boolean;
	web_commit_signoff_required: boolean;
	topics: string[];
	visibility: "public" | "private";
	forks: number;
	open_issues: number;
	watchers: number;
	default_branch: string;
};

// TODO: Check if this can be GHUser
export type GHActor = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
};

export type GHWorkflowTriggerActor = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
};

type GHAuthor = { name: string; email: string };

export type GHHeadCommit = {
	id: string;
	tree_id: string;
	message: string;
	timestamp: string;
	author: GHAuthor;
	committer: GHAuthor;
};

export type GHWorkflowRun = {
	id: number;
	name: string;
	node_id: string;
	head_branch: string;
	head_sha: string;
	path: string;
	display_title: string;
	run_number: number;
	event: string;
	status: string;
	conclusion: string | null;
	workflow_id: number;
	check_suite_id: number;
	check_suite_node_id: string;
	url: string;
	html_url: string;
	pull_requests: string[];
	created_at: string;
	updated_at: string;
	actor: GHActor;
	run_attempt: number;
	referenced_workflows: string[];
	run_started_at: string;
	triggering_actor: GHWorkflowTriggerActor;
	jobs_url: string;
	logs_url: string;
	check_suite_url: string;
	artifacts_url: string;
	cancel_url: string;
	rerun_url: string;
	previous_attempt_url: string;
	workflow_url: string;
	head_commit: GHHeadCommit;
	repository: GHRepository;
	head_repository: GHRepository;
};

export type GHWorkflowJob = {
	id: number;
	run_id: number;
	workflow_name: string;
	head_branch: string;
	run_url: string;
	run_attempt: number;
	node_id: string;
	head_sha: string;
	url: string;
	html_url: string;
	status: string;
	conclusion: string;
	created_at: string;
	started_at: string;
	completed_at: string;
	name: string;
	check_run_url: string;
	labels: string[];
	runner_id: number;
	runner_name: string;
	runner_group_id: number;
	runner_group_name: string;
	steps: Record<string, unknown>[];
};

export type GHWorkflow = {
	id: number;
	node_id: string;
	name: string;
	path: string;
	state: string;
	created_at: string;
	updated_at: string;
	url: string;
	html_url: string;
	badge_url: string;
};

export type GHDeployment = {
	url: string;
	id: number;
	node_id: string;
	task: string;
	original_environment: string;
	environment: string;
	description: null;
	created_at: string;
	updated_at: string;
	statuses_url: string;
	repository_url: string;
	creator: GHUser;
	sha: string;
	ref: string;
	transient_environment: boolean;
	production_environment: boolean;
	performed_via_github_app: boolean | null;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	payload: Record<any, any>;
};

export type GHDeploymentStatus = {
	url: string;
	id: number;
	node_id: string;
	state: string;
	creator: GHUser;
	description: string;
	environment: string;
	target_url: string;
	created_at: string;
	updated_at: string;
	deployment_url: string;
	repository_url: string;
	environment_url: string;
	log_url: string;
	performed_via_github_app: boolean | null;
};

export type GHCommentAction = {
	action: "created";
	comment: GHComment;
	repository: GHRepository;
	sender: GHUser;
};

export type GHInProgressAction = {
	action: "in_progress";
	workflow_run?: GHWorkflowRun;
	workflow?: GHWorkflow;
	workflow_job?: GHWorkflowJob;
	repository: GHRepository;
	sender: GHUser;
};

export type GHDeploymentAction = {
	action: "created";
	deployment_status: GHDeploymentStatus;
	deployment: GHDeployment;
	check_run: string | null;
	workflow: string | null;
	workflow_run: string | null;
	repository: GHRepository;
	sender: GHUser;
};

export type GHCompletedAction = {
	action: "completed";
	workflow_job: GHWorkflowJob;
	repository: GHRepository;
	sender: GHUser;
};
