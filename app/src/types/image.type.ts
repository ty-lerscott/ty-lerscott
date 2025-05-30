export type Image = {
	id: string;
	storage: string;
	filename_disk: string;
	filename_download: string;
	title: string;
	type: string;
	folder: null;
	uploaded_by: string;
	created_on: string;
	charset: null;
	filesize: number;
	width: number;
	height: number;
	duration: number;
	embed: null;
	description: string | null;
	location: null;
	tags: null;
	metadata: Record<string, string>;
	focal_point_x: number | null;
	focal_point_y: number | null;
	tus_id: null;
	tus_data: null;
	uploaded_on: string;
};
