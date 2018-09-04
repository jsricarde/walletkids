/*
 * This source code is the confidential, proprietary information of
 * BT & T Investment Pty Ltd. here in, you may not disclose such Information,
 * and may only use it in accordance with the terms of the license
 * agreement you entered into with BT & T Investment Pty Ltd.
 *
 * 2017: BT & T Investment Pty Ltd.
 * All Rights Reserved.
 */

import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;
  /**
   * Setter for sidenav.
   *
   * @param {MatSidenav} sidenav
   */
  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  /**
   * Open this sidenav, and return a Promise that will resolve when it's fully opened (or get rejected if it didn't).
   *
   * @returns Promise<MdDrawerToggleResult>
   */
  public open(): Promise<any> {
    return this.sidenav.open();
  }

  /**
   * Close this sidenav, and return a Promise that will resolve when it's fully closed (or get rejected if it didn't).
   *
   * @returns Promise<MdDrawerToggleResult>
   */
  public close(): Promise<any> {
    return this.sidenav.close();
  }

  /**
   * Toggle this sidenav. This is equivalent to calling open() when it's already opened, or close() when it's closed.
   *
   * @param {boolean} isOpen  Whether the sidenav should be open.
   *
   * @returns {Promise<MdDrawerToggleResult>}
   */
  public toggle(isOpen?: boolean): Promise<any> {
    return this.sidenav.toggle(isOpen);
  }
}
