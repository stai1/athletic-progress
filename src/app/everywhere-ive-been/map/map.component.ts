import { Component, AfterViewInit } from '@angular/core';
import { defaults as defaultControls } from 'ol/control';

import {Map, View, Feature } from 'ol';
import {fromLonLat, toLonLat, transform} from 'ol/proj';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {OSM, XYZ} from 'ol/source'; 
import {LineString, MultiPoint, Point} from 'ol/geom';
import {Style, Stroke, Circle, Fill} from 'ol/style';
import Polyline from 'ol/format/Polyline';
import ZoomToExtent from 'ol/control/ZoomToExtent';

import { ActivityService } from '../../activity.service';
import { Activity } from '../../activity';
import { pathjoin } from 'src/app/utils';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map: Map;

  lineStyle = new Style({
    stroke: new Stroke({
      color: '#ff0000',
      width: 2
    })
  });

  highlight = new Style({
    stroke: new Stroke({
      color: '#00ff00',
      width: 4
    })
  });

  selected: Feature = null;

  autoMove: boolean = true;
  userInteracted: boolean = false; // set to and stays true on first user interaction with map
  
  pathLayerSource = new VectorSource({ wrapX: true });
  selectedLayerSource = new VectorSource({ wrapX: true });

  constructor(
    private activityService: ActivityService,
  ) { }


  ngAfterViewInit() {
    let topoSource = new XYZ({
      url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
    });
    let standardSource = new XYZ({
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    });

    let mapSource = new OSM();

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({source: mapSource}),
        new VectorLayer({ source: this.pathLayerSource}),
        new VectorLayer({ source: this.selectedLayerSource}),
      ],
      view: new View({
        center: fromLonLat([0,0]),
        zoom: 0,
      }),
    });

    this.map.on('pointermove', (e) => {
      if (this.selected !== null) {
        this.selected.setStyle(this.lineStyle);
        this.selectedLayerSource.removeFeature(this.selected);
        this.pathLayerSource.addFeature(this.selected);
        document.body.style.cursor = 'default';
        this.selected = null;
      }
      
      this.map.forEachFeatureAtPixel(e.pixel, (f) => {
        this.selected = <Feature> f;
        console.log(f);
        this.pathLayerSource.removeFeature(this.selected);
        this.selectedLayerSource.addFeature(this.selected);
        this.selected.setStyle(this.highlight);
        document.body.style.cursor = 'pointer';
        return true;
      });
    });

    this.map.on('click', (e) => {
      if(this.selected) {
        window.open(pathjoin('https://www.strava.com/activities/', this.selected.get('id')), '_blank');
      }
    });

    let userInputFunction = () => {
      this.userInteracted = true;
    };

    this.map.on('pointerdown', userInputFunction)
    this.map.on('movestart', () => {
      if(!this.autoMove) 
        this.userInteracted = true;
    })
    this.map.on('moveend', () => {
      this.autoMove = false;
    });

    this.activityService.newActivities.subscribe(
      activities => {
        this.addActivitiesToMap(activities);
        if(!this.userInteracted) {
          this.autoMove = true;
          this.fitAll();
        }
      }
    );
    this.activityService.loadAllActivities().subscribe(
      (result) => {
        console.log(`activities: ${this.activityService.activities.length}`);
        let extent = this.pathLayerSource.getExtent();
      }
    );
  }

  fitAll() {
    let extent = this.pathLayerSource.getExtent();
    this.map.getView().fit(extent);
  }

  addActivitiesToMap(activities: Activity[]): void {
    for(let activity of activities) {
      let route = (new Polyline().readGeometry(
        activity.polyline,
        {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        }
      )).simplify(10); // decimate curve
      let lineFeature = new Feature({ geometry: route});
      lineFeature.setStyle(this.lineStyle);
      lineFeature.set('id', activity.id);
      lineFeature.set('name', activity.name);
      lineFeature.set('date', activity.start_date);
      this.pathLayerSource.addFeature(lineFeature);

    }
    
  }


}
