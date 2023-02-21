let playlist = [ {
  'title': 'Stop Crying Your Heart Out - Oasis',
  'audio': "assets/Oasis - Stop Crying Your Heart Out (320 kbps).mp3",
}, {
  'title': 'Epilogue - La La Land',
  'audio': "assets/Epilogue.mp3",
}, {
  'title': 'City Of Stars - La La Land',
  'audio': "assets/City Of Stars.mp3",
}, {
  'title': 'The Night We Met - Lord Huron',
  'audio': "assets/Lord Huron - The Night We Met (Official Audio).mp3",
}, {
  'title': 'Memories - Conan Gray',
  'audio': "assets/Conan Gray - Memories (AUDIO).mp3",
}, {
  'title': 'Cars Outside - James Arthur',
  'audio': "assets/James Arthur - Car's Outside (Official Lyric Video).mp3",
}, {
  'title': 'When I See You Smile - Bad English',
  'audio': "assets/When I See You Smile.mp3",
}, {
  'title': 'The Strokes- Selfless',
  'audio': "assets/The Strokes - Selfless (Audio).mp3",
}, {
  'title': 'Apocalypse - Cigarettes After Sex',
  'audio': "assets/Apocalypse - Cigarettes After Sex.mp3",
}, {
  'title': 'Something About Your Love - Mason Jennings',
  'audio': "assets/Something About Your Love.mp3",
}, {
  'title': 'Those Eyes - New West',
  'audio': "assets/New West - Those Eyes.mp3",
}, {
  'title': 'Until I Found You - Stephen Sanchez',
  'audio': "assets/Until I Found You (Em Beihold Version).mp3",
}, {
  'title': 'Heaven Knows Im Miserable Now - The Smiths',
  'audio': "assets/The Smiths - Heaven Knows I'm Miserable Now.mp3",
}, {
  'title': 'Here With Me - d4vd',
  'audio': "assets/d4vd - Here With Me (Official Audio).mp3",
}, {
  'title': 'Ojitos lindos - Bad Bunny',
  'audio': "assets/Ojitos lindos- Bad bunny Ft Bomba stereo (Audio Official).mp3",
}, {
  'title': 'Yellow - Coldplay',
  'audio': "assets/Coldplay - Yellow.mp3",
} ];
i = 0;
n = playlist.length;
let player = document.getElementById( 'player' );
let dur = document.getElementById( 'dur' );
playlist.forEach( function( i ) {
  console.log( i.audio )
  player.src = i.audio;
  $( '.title' ).html( i.title );
}, );

function calculateTotalValue( length ) {
  let minutes = Math.floor( length / 60 ),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString( ),
    seconds = seconds_str.substr( 0, 2 ),
    time = minutes + ':' + seconds
  return time;
}

function calculateCurrentValue( currentTime ) {
  let current_hour = parseInt( currentTime / 3600 ) % 24,
    current_minute = parseInt( currentTime / 60 ) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed( ),
    current_time = ( current_minute < 10 ? "0" + current_minute : current_minute ) + ":" + ( current_seconds < 10 ? "0" + current_seconds : current_seconds );
  return current_time;
}

function initProgressBar( ) {
  let length = player.duration;
  let current_time = player.currentTime;
  let totalLength = calculateTotalValue( length )
  jQuery( ".end-time" ).html( totalLength );
  let currentTime = calculateCurrentValue( current_time );
  jQuery( ".start-time" ).html( currentTime );
  dur.value = player.currentTime;
  if ( player.currentTime == player.duration ) {
    $( "#play-btn" ).fadeIn( "slow", function( ) {
      $( this ).removeClass( "fa-pause" );
      $( this ).addClass( "fa-play" );
      dur.value = 0;
    } );
  }
};

function mSet( ) {
  player.currentTime = dur.value;
}

function mDur( ) {
  let length = player.duration;
  dur.max = length;
}

function initPlayers( num ) {
  for ( let i = 0; i < num; i++ ) {
    ( function( ) {
      let playerContainer = document.getElementById( 'player-container' ),
        player = document.getElementById( 'player' ),
        isPlaying = false,
        playBtn = document.getElementById( 'play-btn' );
      if ( playBtn != null ) {
        playBtn.addEventListener( 'click', function( ) {
          togglePlay( )
        } );
      }

      function togglePlay( ) {
        if ( player.paused === false ) {
          player.pause( );
          isPlaying = false;
          $( "#play-btn" ).fadeIn( "slow", function( ) {
            $( this ).removeClass( "fa-pause" );
            $( this ).addClass( "fa-play" );
          } );
        }
        else {
          player.play( );
          $( "#play-btn" ).fadeIn( "slow", function( ) {
            $( this ).removeClass( "fa-play" );
            $( this ).addClass( "fa-pause" );
          } );
          isPlaying = true;
        }
      }
    }( ) );
  }
}
$( "#next" ).data( 'dir', 1 );
$( "#prev" ).data( 'dir', -1 );
$( '#next, #prev' ).on( 'click', function( ) {
  i = ( i + $( this ).data( 'dir' ) + n ) % n;
  console.log( i );
  player.src = playlist[ i ].audio;
  $( '.title' ).html( playlist[ i ].title );
  $( '#play-btn' ).removeClass( "fa-play" );
  $( '#play-btn' ).addClass( "fa-pause" );
  player.play( );
} );
$( ".audio-player" )
  .toArray( )
  .forEach( function( player ) {
    let audio = $( player ).find( "audio" )[ 0 ];
    let volumeControl = $( player ).find( ".volumeControl .wrapper" );
    volumeControl.find( ".outer" ).on( "click", function( e ) {
      let volumePosition = e.pageX - $( this ).offset( ).left;
      let audioVolume = volumePosition / $( this ).width( );
      if ( audioVolume >= 0 && audioVolume <= 1 ) {
        audio.volume = audioVolume;
        $( this )
          .find( ".inner" )
          .css( "width", audioVolume * 100 + "%" );
      }
    } );
  } );
$( function( ) {
  // Dropdown toggle
  $( '.dropdown-toggle' ).click( function( ) {
    $( this ).next( '.dropdown' ).slideToggle( "fast" );
  } );
  $( document ).click( function( e ) {
    var target = e.target;
    if ( !$( target ).is( '.dropdown-toggle' ) && !$( target ).parents( ).is( '.dropdown-toggle' ) ) {
      $( '.dropdown' ).hide( );
    }
  } );
} );
$( '#darkButton' ).click( switchDark );
$( '#whiteButton' ).click( switchWhite );
$( '#blueButton' ).click( switchBlue );

function switchDark( ) {
  $( '#skin' ).attr( 'class', 'dark audio-player' );
  $( '.inner' ).css( 'background', '#fff' );
  $( '.title' ).css( 'color', '#fff' );
  $( '.time' ).css( 'color', '#fff' );
  $( '.fa-volume-up' ).css( {
    'color': '#fff'
  } );
  $( '.audio-player #play-btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
  $( '.ctrl_btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
}

function switchWhite( ) {
  $( '#skin' ).attr( 'class', 'white audio-player' );
  $( '.inner' ).css( 'background', '#555' );
  $( '.title' ).css( 'color', '#555' );
  $( '.time' ).css( 'color', '#555' );
  $( '.fa-volume-up' ).css( {
    'color': '#555'
  } );
  $( '.audio-player #play-btn' ).css( {
    'color': '#555',
    'border-color': '#555'
  } );
  $( '.ctrl_btn' ).css( {
    'color': '#555',
    'border-color': '#555'
  } );
}

function switchBlue( ) {
  $( '#skin' ).attr( 'class', 'blue audio-player' );
  $( '.inner' ).css( 'background', '#fff' );
  $( '.title' ).css( 'color', '#fff' );
  $( '.time' ).css( 'color', '#fff' );
  $( '.fa-volume-up' ).css( {
    'color': '#fff'
  } );
  $( '.audio-player #play-btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
  $( '.ctrl_btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
}
initPlayers( jQuery( '#player-container' ).length );
