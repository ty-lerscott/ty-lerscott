type GHAuthor = {
	avatar_url: string;
	events_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	gravatar_id: string;
	html_url: string;
	id: number;
	login: string;
	node_id: string;
	organizations_url: string;
	received_events_url: string;
	repos_url: string;
	site_admin: boolean;
	starred_url: string;
	subscriptions_url: string;
	type: string;
	url: string;
	user_view_type: string;
};

type GHRepository = {
	allow_forking: boolean;
	archive_url: string;
	archived: boolean;
	assignees_url: string;
	blobs_url: string;
	branches_url: string;
	clone_url: string;
	collaborators_url: string;
	comments_url: string;
	commits_url: string;
	compare_url: string;
	contents_url: string;
	contributors_url: string;
	created_at: string;
	default_branch: string;
	deployments_url: string;
	description: string | null;
	disabled: boolean;
	downloads_url: string;
	events_url: string;
	fork: boolean;
	forks: number;
	forks_count: number;
	forks_url: string;
	full_name: string;
	git_commits_url: string;
	git_refs_url: string;
	git_tags_url: string;
	git_url: string;
	has_discussions: boolean;
	has_downloads: boolean;
	has_issues: boolean;
	has_pages: boolean;
	has_projects: boolean;
	has_wiki: boolean;
	homepage: string;
	hooks_url: string;
	html_url: string;
	id: number;
	is_template: boolean;
	issue_comment_url: string;
	issue_events_url: string;
	issues_url: string;
	keys_url: string;
	labels_url: string;
	language: string;
	languages_url: string;
	license: string | null;
	merges_url: string;
	milestones_url: string;
	mirror_url: string | null;
	name: string;
	node_id: string;
	notifications_url: string;
	open_issues: number;
	open_issues_count: number;
	owner: GHAuthor;
	private: boolean;
	pulls_url: string;
	releases_url: string;
	size: number;
	ssh_url: string;
	stargazers_count: number;
	stargazers_url: string;
	statuses_url: string;
	subscribers_url: string;
	subscription_url: string;
	svn_url: string;
	topics: string[];
	tree_url: string;
	updated_at: string;
	url: string;
	visibility: string;
	watchers: number;
	watchers_count: number;
	web_commit_signoff_required: boolean;
};

export type GHDeploymentStatus = {
	deployment_status: {
		url: string;
		id: number;
		node_id: string;
		state: string;
		creator: GHAuthor;
		description: string;
		environment: string;
		target_url: string;
		created_at: string;
		updated_at: string;
		deployment_url: string;
		repository_url: string;
		environment_url: string;
		log_url: string;
		performed_via_github_app: string | null;
	};
	deployment: {
		url: string;
		id: number;
		node_id: string;
		task: string;
		original_environment: string;
		environment: string;
		description: string;
		created_at: string;
		updated_at: string;
		statuses_url: string;
		repository_url: string;
		creator: GHAuthor;
		sha: string;
		ref: string;
		payload: Record<string, unknown>;
		transient_environment: boolean;
		production_environment: boolean;
		performed_via_github_app: string | null;
	};
	check_run: string | null;
	workflow: string | null;
	workflow_run: string | null;
	action: string;
	repository: GHRepository;
	sender: GHAuthor;
};
