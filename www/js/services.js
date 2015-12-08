angular.module('starter.services', [])

.factory('MainData', function () {
	return {
		locations: [{
			id: 0,
			name: "Krannert Center for the Performance Arts",
			coords: {
				latitude: 40.108203,
				longitude: -88.222443
			},
			category: "Arts & Entertainment",
			image: "img/krannert.jpg",
			options: {
				icon: {
					url: "img/sm/krannert.jpg"
				}
			},
			cost: 20,
			time: {
				hours: 2,
				minutes: 15
			}
		}, {
			id: 1,
			name: "Urbana Indoor Aquatic Center",
			coords: {
				latitude: 40.103488,
				longitude: -88.206898
			},
			category: "Active Life",
			image: "img/aquatic.jpg",
			options: {
				icon: {
					url: "img/sm/aquatic.jpg"
				}
			},
			cost: 10,
			time: {
				hours: 1,
				minutes: 30
			}
		}, {
			id: 2,
			name: "Urbana Dog Park",
			coords: {
				latitude: 40.126868,
				longitude: -88.188583
			},
			category: "Parks",
			image: "img/dog_park.jpeg",
			options: {
				icon: {
					url: "img/sm/dog_park.jpg"
				}
			},
			cost: 0,
			time: {
				hours: 1,
				minutes: 15
			}
		}, {
			id: 3,
			name: "Market Place Shopping Center",
			coords: {
				latitude: 40.142708,
				longitude: -88.243130
			},
			category: "Shopping",
			image: "img/marketplace.jpg",
			options: {
				icon: {
					url: "img/sm/marketplace.jpg"
				}
			},
			cost: 100,
			time: {
				hours: 2,
				minutes: 0
			}
		}, {
			id: 4,
			name: "The Body Therapy Center",
			coords: {
				latitude: 40.118187,
				longitude: -88.244851
			},
			category: "Beauty & Spas",
			image: "img/body_therapy.jpeg",
			options: {
				icon: {
					url: "img/sm/body_therapy.jpg"
				}
			},
			cost: 50,
			time: {
				hours: 0,
				minutes: 45
			}
		}, {
			id: 5,
			name: "The Blind Pig Bar",
			coords: {
				latitude: 40.117091,
				longitude: -88.242177
			},
			category: "Nightlife",
			image: "img/blind_pig.jpg",
			options: {
				icon: {
					url: "img/sm/blind_pig.jpg"
				}
			},
			cost: 20,
			time: {
				hours: 0,
				minutes: 50
			}
		}, {
			id: 6,
			name: "Golden Harbor Authentic Chinese Cuisine",
			coords: {
				latitude: 40.111354,
				longitude: -88.243753
			},
			category: "Restaurant",
			image: "img/golden-harbor.jpg",
			options: {
				icon: {
					url: "img/sm/golden-harbor.jpg"
				}
			},
			cost: 60,
			time: {
				hours: 1,
				minutes: 30
			}
		}, {
			id: 7,
			name: "Hampton Inn Champaign/Urbana",
			coords: {
				latitude: 40.117213,
				longitude: -88.224870
			},
			category: "Hotels & Travel",
			image: "img/hampton.jpg",
			options: {
				icon: {
					url: "img/sm/hampton.jpg"
				}
			},
			cost: 110,
			time: {
				hours: 8,
				minutes: 30
			}
		}, {
			id: 8,
			name: "Murphy's Pub",
			coords: {
				latitude: 40.110744,
				longitude: -88.230146
			},
			category: "Nightlife",
			image: "img/murphy.jpg",
			options: {
				icon: {
					url: "img/sm/murphy.jpg"
				}
			},
			cost: 30,
			time: {
				hours: 1,
				minutes: 45
			}
		}, {
			id: 9,
			name: "Sitara Indian Restaurant & Lounge",
			coords: {
				latitude: 40.112164,
				longitude: -88.208609,
			},
			category: "Restaurants",
			image: "img/sitara.jpg",
			options: {
				icon: {
					url: "img/sm/sitara.jpg"
				}
			},
			cost: 40,
			time: {
				hours: 1,
				minutes: 0
			}
		}],
		categories: [{
			name: "Food",
			checked: true
		}, {
			name: "Nightlife",
			checked: true
		}, {
			name: "Restaurants",
			checked: true
		}, {
			name: "Shopping",
			checked: true
		}, {
			name: "Active Life",
			checked: true
		}, {
			name: "Arts & Entertainment",
			checked: true
		}, {
			name: "Beauty & Spas",
			checked: true
		}, {
			name: "Education",
			checked: true
		}, {
			name: "Event Planning & Services",
			checked: true
		}, {
			name: "Health & Medical",
			checked: true
		}, {
			name: "Hotels & Travel",
			checked: true
		}, {
			name: "Museums",
			checked: true
		}, {
			name: "Parks",
			checked: true
		}, ]
	}
})
