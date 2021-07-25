/**
 * utility - Omit<Type>
 * = 기존에 선언된 Type 의 프로퍼티 중에, 일부 프로퍼티만 뺀 결과를 사용하고 싶을 때
 * 
 * 결과적으로, 내가 특정 Type 내부적으로, 필요한 것만 쏙쏙 뽑아내서 사용하는 것이 손이 덜 갈것 같으면 => Pick Type
 * 많은 타입중에, 특정 몇 가지 프로퍼티만 제외한 타입이 필요하다 => Omit Type
 */
{
	type Video = {
		id: string;
		title: string;
		url: string;
		data: string;
	}

	// Omit Type 이 필요하다면, 필요한 곳 마다 선언하지 말고, 공통적으로 사용할 파일 상단에 작성할 것
	type VideoMetaData = Omit<Video, 'url' | 'data'>;

	function getVideo2(id: string): Video {
		return {
			id,
			title: 'video',
			url: 'https://..',
			data: 'byte-data..',
		}
	}
	
	// 사용할 곳에서, 정의한 Omit 타입을 사용할 것
	function getVideoMetadata2(id: string): VideoMetaData {
		return {
			id,
			title: 'title',
		};
	}
}