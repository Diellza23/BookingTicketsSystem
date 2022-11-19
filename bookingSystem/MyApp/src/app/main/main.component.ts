import { Component, OnInit } from '@angular/core';
import { IPropertyBase } from '../model/ipropertybase';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  properties: IPropertyBase[];
  constructor(private housingService: HousingService) {}

  ngOnInit() {
    this.housingService.getTopThreeProperties().subscribe(
      (data) => {
        this.properties = data;
        console.log(data);
      },
      (error) => {
        console.log('httperror:');
        console.log(error);
      }
    );

    const accordionItems = document.querySelectorAll('.value__accordion-item');

    accordionItems.forEach((item) => {
      const accordionHeader = item.querySelector('.value__accordion-header');
      accordionHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.accordion-open');

        toggleItem(item);

        if (openItem && openItem !== item) {
          toggleItem(openItem);
        }
      });
    });
    const toggleItem = (item) => {
      const accordionContent = item.querySelector('.value__accordion-content');

      if (item.classList.contains('accordion-open')) {
        accordionContent.removeAttribute('style');
        item.classList.remove('accordion-open');
      } else {
        accordionContent.style.height = accordionContent.scrollHeight + 'px';
        item.classList.add('accordion-open');
      }
    };
  }
}
