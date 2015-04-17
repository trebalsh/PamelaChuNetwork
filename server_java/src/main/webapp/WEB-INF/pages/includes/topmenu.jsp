<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${ios == null || !ios}">
    <div id="navbar" class="navbar noRadius">
        <button type="button" class="btn-blue navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-responsive-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/pamelaChu/home">
            <img src="/img/company-logo.png" alt="<fmt:message key="pamelaChu.logo"/>">
            <fmt:message key="pamelaChu.title"/>
        </a>
    <c:if test="${currentPage != null && currentPage == 'home'}">
        <button type="button" class="editTatam btn btn-blue navbar-toggle navbar-edit">
            <i class="close glyphicon glyphicon-pencil"></i>
        </button>
    </c:if>
        <div class="nav-collapse navbar-responsive-collapse collapse">
            <ul class="nav">
                <li>
                    <c:if test="${currentPage != null && currentPage == 'home'}">
                      <a href="#/home/timeline">
                    </c:if>
                    <c:if test="${currentPage == null || currentPage != 'home'}">
                      <a href="/pamelaChu/home/timeline">
                    </c:if>
                        <span>
                            <span class="glyphicon glyphicon-home"></span>
                            <span class="hidden-tablet">
                                <fmt:message key="pamelaChu.timeline"/>
                            </span>
                        </span>
                    </a>
                </li>
                <!-- <li class="dropdown pointer">
                    <a class="dropdown-toggle" data-toggle="dropdown">
                    <span>
                        <span class="glyphicon glyphicon-info-sign"></span>
                        <span class="hidden-tablet">
                            <fmt:message key="pamelaChu.menu.about"/>
                        </span>
                        <b class="caret"></b>
                    </span>
                    </a>
                    <ul class="dropdown-menu closed">
                        <li>
                            <a href="/pamelaChu/presentation">
                                <span class="glyphicon glyphicon-eye-open"></span>
                                <fmt:message key="pamelaChu.menu.presentation"/>
                            </a>
                        </li>
                        <li>
                            <a href="/pamelaChu/tos">
                                <span class="glyphicon glyphicon-briefcase"></span>
                                <fmt:message key="pamelaChu.menu.tos"/>
                            </a>
                        </li>
                        <li class="dropdown-submenu">
                            <a>
                                <span class="glyphicon glyphicon-flag"></span>
                                <fmt:message key="pamelaChu.menu.language"/>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="?language=en">
                                        <fmt:message key="pamelaChu.menu.language.en"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="?language=fr">
                                        <fmt:message key="pamelaChu.menu.language.fr"/>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="/pamelaChu/license">
                                <span class="glyphicon glyphicon-info-sign"></span>
                                <fmt:message key="pamelaChu.menu.license"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/ippontech/pamelaChu/issues" target="_blank">
                                <span class="glyphicon glyphicon-inbox"></span>
                                <fmt:message key="pamelaChu.github.issues"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/ippontech/pamelaChu" target="_blank">
                                <span class="glyphicon glyphicon-wrench"></span>
                                <fmt:message key="pamelaChu.github.fork"/>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="http://www.ippon.fr/" target="_blank">
                                <span class="glyphicon glyphicon-exclamation-sign"></span>
                                <fmt:message key="pamelaChu.ippon.website"/>
                            </a>
                        </li>
                        <li>
                            <a href="http://blog.ippon.fr/" target="_blank">
                                <span class="glyphicon glyphicon-pencil"></span>
                                <fmt:message key="pamelaChu.ippon.blog"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/ippontech" target="_blank">
                                <span class="glyphicon glyphicon-bullhorn"></span>
                                <fmt:message key="pamelaChu.ippon.twitter.follow"/>
                            </a>
                        </li>
                    </ul>
                </li> -->
            </ul>

            <c:if test="${currentPage != null && currentPage == 'home'}">
            <sec:authorize ifAnyGranted="ROLE_USER">
            <ul class="nav pull-right">
                <li>
                    <a href="/pamelaChu/account/#/profile">
                        <span>
                            <span class="glyphicon glyphicon-user"></span>
                            <span class="hidden-tablet">
                                <fmt:message key="pamelaChu.menu.profile"/>
                            </span>
                        </span>
                    </a>
                </li>
                <li class="dropdown pointer">
                    <a class="dropdown-toggle" data-toggle="dropdown">
                    <span>
                        <span class="glyphicon glyphicon-th-list"></span>
                        <span class="hidden-tablet">
                            <fmt:message key="pamelaChu.menu.account"/>
                        </span>
                        <b class="caret"></b>
                    </span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- <li>
                            <a href="/pamelaChu/account/#/profile">
                                <span class="glyphicon glyphicon-user"></span>
                                <fmt:message key="pamelaChu.menu.profile"/>
                            </a>
                        </li>
                        <li>
                            <a href="/pamelaChu/account/#/preferences">
                                <span class="glyphicon glyphicon-picture"></span>
                                <fmt:message key="pamelaChu.menu.preferences"/>
                            </a>
                        </li> -->
                        <li>
                            <a href="/pamelaChu/account/#/password">
                                <span class="glyphicon glyphicon-lock"></span>
                                <fmt:message key="pamelaChu.menu.password"/>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <!-- <a href="/pamelaChu/account/#/files">
                                <span class="glyphicon glyphicon-file"></span>
                                <fmt:message key="pamelaChu.menu.files"/>
                            </a> -->
                            <a href="/pamelaChu/account/#/users">
                                <span class="glyphicon glyphicon-globe"></span>
                                <fmt:message key="pamelaChu.menu.directory"/>
                            </a>
                            <a href="/pamelaChu/account/#/groups">
                                <span class="glyphicon glyphicon-th-large"></span>
                                <fmt:message key="pamelaChu.menu.groups"/>
                            </a>
                            <a href="/pamelaChu/account/#/tags">
                                <span class="glyphicon glyphicon-tags"></span>
                                <fmt:message key="pamelaChu.menu.tags"/>
                            </a>
                        </li>
                        <!-- <li class="divider"></li>
                        <li>
                            <a href="/pamelaChu/account/#/status_of_the_day">
                                <span class="glyphicon glyphicon-signal"></span>
                                <fmt:message key="pamelaChu.menu.status.of.the.day"/>
                            </a>
                            <a href="/pamelaChu/home#company">
                                <span class="glyphicon glyphicon-briefcase"></span>
                                <fmt:message key="pamelaChu.menu.company.wall"/>
                            </a>
                        </li> -->
                        <li class="divider"></li>
                        <li>
                            <a href="/pamelaChu/logout">
                                <span class="glyphicon glyphicon-off"></span>
                                <fmt:message key="pamelaChu.logout"/>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="hidden-phone">
                    <button id="editTatam" class="editTatam btn btn-pub btn-blue">
                        <i class="glyphicon glyphicon-pencil"></i>
                        <span class="visible-desktop">
                            <fmt:message key="pamelaChu.tatam.publish"/>
                        </span>
                    </button>
                </li>
            </ul>
            <!--<ul class="nav pull-right">
                <li>
                    <a href="#" id="help-tour">
                        <span>
                            <span class="glyphicon glyphicon-question-sign"></span>
                            <span class="hidden-tablet">
                                <fmt:message key="pamelaChu.status.help.title"/>
                            </span>
                        </span>
                    </a>
                </li>
            </ul> -->
            <form id="searchform" class="navbar-form pull-right col-span-4" action="">
                <input name="search" type="text" class="col-span-12" id="searchinput" placeholder="<fmt:message key="pamelaChu.search.placeholder"/>" autocomplete="off">
                <span class="deleteicon"><i class="glyphicon glyphicon-remove-sign"></i></span>
            </form>
            </sec:authorize>
            </c:if>
        </div>
    </div>
</c:if>