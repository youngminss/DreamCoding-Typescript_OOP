/**
 * utility - Pick<Type>
 * = 기존에 선언된 Type 의 프로퍼티 중에, 일부 프로퍼티만 골라서 사용하고 싶을 때
 */
{
	type Video = {
		id: string;
		title: string;
		url: string;
		data: string;
	}

	// Pick Type 이 필요하다면, 필요한 곳 마다 선언하지 말고, 공통적으로 사용할 파일 상단에 작성할 것
	type VideoMetaData = Pick<Video, 'id' | 'title'>;

	function getVideo(id: string): Video {
		return {
			id,
			title: 'video',
			url: 'https://..',
			data: 'byte-data..',
		}
	}
	
	// 사용할 곳에서, 정의한 Pick 타입을 사용할 것
	function getVideoMetadata(id: string): VideoMetaData {
		return {
			id,
			title: 'title',
		};
	}
}